import httpStatus from "http-status";
import User from "./user.model.js";
import ApiError from "../../../errors/ApiError.js";
import { encryptPassword } from "../../../helper/AuthHelper.js";
import cloudinary from "../../middleware/cloudinary.js";
import { userSearchableFields } from "./user.constant.js";
import { PaginationHelpers } from "../../../helper/paginationHelper.js";

const createUser = async (user, file) => {
  const { path } = file;
  const isEmailExist = await User.findOne({ email: user.email });
  if (isEmailExist) {
    throw new ApiError(httpStatus.CONFLICT, "Email already taken");
  }

  user.password = encryptPassword(user.password);

  try {
    const result = await cloudinary.v2.uploader.upload(path, {
      folder: "profile-images",
      use_filename: true,
    });

    const savedUser = await User.create({
      name: user?.name,
      employeeId: user?.employeeId,
      role: user?.role?.toLowerCase(),
      department: user?.department?.toLowerCase(),
      email: user?.email,
      password: user?.password,
      profileImage: result.secure_url,
      cloudinaryId: result.public_id,
      isAdmin: user?.role?.toLowerCase() === "admin",
    });

    if (!savedUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User not created");
    }
    savedUser.password = undefined;
    return savedUser;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong");
  }
};

const getLoggedInUser = async (payload) => {
  const { employeeId } = payload;
  const user = await User.findOne({ employeeId });

  user.password = undefined;

  return user;
};

const getAUser = async (email) => {
  const isExist = await User.findOne({ email });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  isExist.password = undefined;

  return isExist;
};

const getAllUser = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map((field) => ({
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

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteOneUser = async (id) => {
  const user = await User.findById(id);

  if (user.role === "super_admin") {
    throw new ApiError(httpStatus.FORBIDDEN, "Super admin cannot be deleted");
  }

  const result = await cloudinary.v2.uploader.destroy(user.cloudinaryId);
  if (!result?.result === "ok") {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Cannot deleted");
  }

  const deletedData = await User.findByIdAndDelete(id);
  return deletedData;
};

const updateOneUser = async (id, payload) => {
  const { role } = await User.findById(id);

  if (role === "super_admin") {
    throw new ApiError(httpStatus.FORBIDDEN, "Super admin cannot be edited");
  }

  payload.isAdmin = payload?.role?.toLowerCase() === "admin";
  const existingEmail = await User.findOne({ email: payload.email });
  const existingEmployeeId = await User.findOne({
    employeeId: payload.employeeId,
  });

  if (existingEmail) {
    throw new ApiError(httpStatus.CONFLICT, "Email is already used");
  }

  if (existingEmployeeId) {
    throw new ApiError(httpStatus.CONFLICT, "Employee Id is already used");
  }

  if (payload.password) {
    const hashedPassword = encryptPassword(payload.password);
    payload.password = hashedPassword;
  }

  const query = { _id: id };
  const updatedData = payload;
  const option = { new: true };
  const result = await User.findOneAndUpdate(query, updatedData, option);

  return result;
};

export const UserService = {
  getLoggedInUser,
  getAUser,
  createUser,
  getAllUser,
  deleteOneUser,
  updateOneUser,
};
