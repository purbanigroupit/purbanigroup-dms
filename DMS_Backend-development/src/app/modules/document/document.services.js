import cloudinary from "../../middleware/cloudinary.js";
import ApiError from "../../../errors/ApiError.js";
import httpStatus from "http-status";
import DocumentPdf from "./document.model.js";
import { PaginationHelpers } from "../../../helper/paginationHelper.js";
import { documentSearchableFields } from "./document.constant.js";

const uploadDocument = async (file, employeeId, data) => {
  const { path } = file;
  const { title, department, subDepartment = "" } = data;
  try {
    const result = await cloudinary.v2.uploader.upload(path, {
      folder: "documents",
      use_filename: true,
    });
    const splittedUrl = result.secure_url.split("upload");
    const downloadableLink =
      splittedUrl[0] + "upload/fl_attachment" + splittedUrl[1];

    const savedDocument = await DocumentPdf.create({
      title: title,
      readableLink: result.secure_url,
      downloadableLink: downloadableLink,
      cloudinaryId: result.public_id,
      department: department?.toLowerCase(),
      subDepartment: subDepartment?.toLowerCase(),
      uploadBy: employeeId,
    });

    if (!savedDocument) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong");
    }

    return savedDocument;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong");
  }
};

const getAllDocument = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: documentSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculationPagination(paginationOptions);

  const sortConditions = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await DocumentPdf.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await DocumentPdf.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteOneDocument = async (id) => {
  const document = await DocumentPdf.findById(id);
  const result = await cloudinary.v2.uploader.destroy(document.cloudinaryId);
  if (!result?.result === "ok") {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Cannot deleted");
  }

  const deletedData = await DocumentPdf.findByIdAndDelete(id);
  return deletedData;
};

export const DocumentService = {
  uploadDocument,
  getAllDocument,
  deleteOneDocument,
};
