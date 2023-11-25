import httpStatus from "http-status";
import cloudinary from "../../middleware/cloudinary.js";
import KnowledgePdf from "./knowledge.model.js";
import ApiError from "../../../errors/ApiError.js";
import path from "path";
import { knowledgeSearchableFields } from "./knowledge.constant.js";
import { PaginationHelpers } from "../../../helper/paginationHelper.js";

const uploadKnowledge = async (employeeId, payload) => {
  payload.uploadBy = employeeId;
  const savedDocument = await KnowledgePdf.create(payload);

  if (!savedDocument) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cannot upload");
  }

  return savedDocument;
};

const getAllKnowledge = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: knowledgeSearchableFields.map((field) => ({
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

  const result = await KnowledgePdf.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await KnowledgePdf.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteOneKnowledge = async (id) => {
  const knowledge = await KnowledgePdf.findById(id);

  if (knowledge.cloudinaryPdfId) {
    await cloudinary.v2.uploader.destroy(knowledge.cloudinaryPdfId);
  }

  if (knowledge.cloudinaryVideoId) {
    await cloudinary.v2.uploader.destroy(knowledge.cloudinaryVideoId, {
      resource_type: "video",
    });
  }

  const deletedData = await KnowledgePdf.findByIdAndDelete(id);
  return deletedData;
};

export const KnowledgeService = {
  uploadKnowledge,
  getAllKnowledge,
  deleteOneKnowledge,
};
