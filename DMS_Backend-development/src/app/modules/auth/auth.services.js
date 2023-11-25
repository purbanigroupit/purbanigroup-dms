import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import { verifyPassword } from "../../../helper/AuthHelper.js";
import User from "../user/user.model.js";
import { jwtHelpers } from "../../../helper/jwtHelpers.js";
import config from "../../../config/index.js";

const login = async (payload) => {
  const { employeeId, password } = payload;

  const isUserExist = await User.findOne({ employeeId });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (!(await verifyPassword(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const { employeeId: id, role } = isUserExist;

  // Create access token
  const accessToken = jwtHelpers.createToken(
    { employeeId: id, role: role },
    config?.jwt?.secret,
    config?.jwt?.expires_in
  );

  // Create refresh token
  const refreshToken = jwtHelpers.createToken(
    { employeeId: id, role: role },
    config?.jwt?.refresh_secret,
    config?.jwt?.refresh_expires_in
  );

  isUserExist.password = undefined;

  return {
    ...isUserExist.toObject(),
    accessToken,
    refreshToken
  };
};

export const AuthService = {
  login,
};
