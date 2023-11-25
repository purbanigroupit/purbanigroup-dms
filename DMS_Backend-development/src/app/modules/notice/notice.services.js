import cloudinary from "../../middleware/cloudinary.js";
import ApiError from "../../../errors/ApiError.js";
import httpStatus from "http-status";
import NoticePdf from "./notice.model.js";

const uploadNotice = async (file, data, employeeId) => {
  const { path } = file;
  const { title } = data;
  try {
    const result = await cloudinary.v2.uploader.upload(path, {
      folder: "notices",
      use_filename: true,
    });

    const splittedUrl = result.secure_url.split("upload");
    const downloadableLink =
      splittedUrl[0] + "upload/fl_attachment" + splittedUrl[1];

    const savedNotice = await NoticePdf.create({
      title: title,
      readableLink: result.secure_url,
      downloadableLink: downloadableLink,
      cloudinaryId: result.public_id,
      uploadBy: employeeId,
    });

    if (!savedNotice) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong");
    }

    return savedNotice;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong");
  }
};

const getAllNotice = async () => {
  const notices = await NoticePdf.find({}).sort("-createdAt");
  return notices;
};

const deleteOneNotice = async (id) => {
  const notice = await NoticePdf.findById(id);
  const result = await cloudinary.v2.uploader.destroy(notice.cloudinaryId);
  if (!result?.result === "ok") {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Cannot deleted");
  }

  const deletedData = await NoticePdf.findByIdAndDelete(id);
  return deletedData;
};

export const NoticeService = {
  uploadNotice,
  getAllNotice,
  deleteOneNotice,
};
