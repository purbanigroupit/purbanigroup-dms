import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { AuthService } from "./auth.services.js";
import config from "../../../config/index.js";

const login = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  // Call the UserService to create the user
  const { refreshToken, ...others } = await AuthService.login(loginData);
  
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  // Dynamic response sender generic function to ensure response format
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successfully",
    meta: null,
    data: others,
  });
});

export const AuthController = {
  login,
};
