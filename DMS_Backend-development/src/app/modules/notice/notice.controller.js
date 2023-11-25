import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { NoticeService } from "./notice.services.js";

const uploadNotice = catchAsync(async (req, res) => {
  const file = req.file;
  const data = req.body;
  const employeeId = req.user.employeeId;

  const result = await NoticeService.uploadNotice(file, data, employeeId);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Notice uploaded successfully",
    meta: null,
    data: result,
  });
});

const getAllNotice = catchAsync(async (req, res) => {
  const result = await NoticeService.getAllNotice();

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Notice retrieved successfully",
    meta: null,
    data: result,
  });
});

const deleteOneNotice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NoticeService.deleteOneNotice(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice deleted successfully",
    meta: null,
    data: result,
  });
});

export const NoticeController = {
  uploadNotice,
  getAllNotice,
  deleteOneNotice,
};
