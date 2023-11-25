import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { DocumentService } from "./document.services.js";
import { documentFilterableField } from "./document.constant.js";
import { paginationFields } from "../../../constants/pagination.js";
import pick from "../../../shared/pick.js";

const uploadDocument = catchAsync(async (req, res) => {
  const { ...file } = req.file;
  const { ...data } = req.body;
  const { employeeId } = req.user;

  const result = await DocumentService.uploadDocument(file, employeeId, data);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Document uploaded successfully",
    meta: null,
    data: result,
  });
});

const getAllDocument = catchAsync(async (req, res) => {
  const filters = pick(req.query, documentFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DocumentService.getAllDocument(
    filters,
    paginationOptions
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Document retrieved successfully",
    meta: null,
    data: result,
  });
});

const deleteOneDocument = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DocumentService.deleteOneDocument(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Document deleted successfully",
    meta: null,
    data: result,
  });
});

export const DocumentController = {
  uploadDocument,
  getAllDocument,
  deleteOneDocument,
};
