import httpStatus from "http-status";
import { UserService } from "./user.services.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import pick from "../../../shared/pick.js";
import { paginationFields } from "../../../constants/pagination.js";
import { userFilterableField } from "./user.constant.js";

const createUser = catchAsync(async (req, res) => {
  const { ...userData } = req.body;
  const file = req.file;

  // Call the UserService to create the user
  const result = await UserService.createUser(userData, file);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    meta: null,
    data: result,
  });
});

const getLoggedInUser = catchAsync(async (req, res) => {
  const { ...user } = req.user;

  // Call the UserService to create the user
  const result = await UserService.getLoggedInUser(user);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    meta: null,
    data: result,
  });
});

const getAUser = catchAsync(async (req, res) => {
  const { email } = req.params;

  // Call the UserService to create the user
  const result = await UserService.getAUser(email);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    meta: null,
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUser(filters, paginationOptions);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    meta: null,
    data: result,
  });
});

const updateOneUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;

  const result = await UserService.updateOneUser(id, updatedData);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    meta: null,
    data: result,
  });
});

const deleteOneUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteOneUser(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    meta: null,
    data: result,
  });
});

export const UserController = {
  getLoggedInUser,
  getAUser,
  createUser,
  getAllUser,
  deleteOneUser,
  updateOneUser,
};
