import catchAsync from "../../../shared/catchAsync.js";
import { KnowledgeService } from "./knowledge.services.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { knowledgeFilterableField } from "./knowledge.constant.js";
import { paginationFields } from "../../../constants/pagination.js";
import pick from "../../../shared/pick.js";

const uploadKnowledge = catchAsync(async (req, res) => {
  const { ...data } = req.body;
  const { employeeId } = req.user;

  const result = await KnowledgeService.uploadKnowledge(
    employeeId,
    data
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Knowledge uploaded successfully",
    meta: null,
    data: result,
  });
});

const getAllKnowledge = catchAsync(async (req, res) => {
  const filters = pick(req.query, knowledgeFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await KnowledgeService.getAllKnowledge(
    filters,
    paginationOptions
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Knowledge retrieved successfully",
    meta: null,
    data: result,
  });
});

const deleteOneKnowledge = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await KnowledgeService.deleteOneKnowledge(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Knowledge deleted successfully",
    meta: null,
    data: result,
  });
});

export const KnowledgeController = {
  uploadKnowledge,
  getAllKnowledge,
  deleteOneKnowledge,
};
