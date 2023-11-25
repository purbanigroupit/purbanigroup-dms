import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { PolicyService } from "./policy.services.js";
import { policyFilterableField } from "./policy.constant.js";
import { paginationFields } from "../../../constants/pagination.js";
import pick from "../../../shared/pick.js";

const uploadPolicy = catchAsync(async (req, res) => {
  const file = req.file;
  const data = req.body;
  const employeeId = req.user.employeeId;

  const result = await PolicyService.uploadPolicy(file, employeeId, data);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Policy uploaded successfully",
    meta: null,
    data: result,
  });
});

const getAllPolicy = catchAsync(async (req, res) => {
  const filters = pick(req.query, policyFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await PolicyService.getAllPolicy(filters, paginationOptions);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Policy retrieved successfully",
    meta: null,
    data: result,
  });
});

const deleteOnePolicy = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PolicyService.deleteOnePolicy(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Policy deleted successfully",
    meta: null,
    data: result,
  });
});

export const PolicyController = {
  uploadPolicy,
  getAllPolicy,
  deleteOnePolicy
};
