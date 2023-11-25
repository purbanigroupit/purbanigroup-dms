import httpStatus from "http-status";
import User from "../modules/user/user.model.js";
import { verifyJWT } from "../../helper/AuthHelper.js";
import ApiError from "../../errors/ApiError.js";

const auth_jwt = async (req, res, next) => {
  try {
    if (typeof req.headers["x-auth-token"] === "undefined") {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access!");
    } else {
      let token = req.headers["x-auth-token"];
      let decoded = verifyJWT(token);
      if (decoded.status) {
        req.auth = decoded.data;
        next();
      } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access!");
      }
    }
  } catch (error) {
    next(error);
  }
};

const verifySuperAdmin = async (req, res, next) => {
  try {
    const requester = req.auth.employeeId;
    const requesterAccount = await User.findOne({ employeeId: requester });
    if (requesterAccount?.role === "super_admin") {
      next();
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Not authorized!");
    }
  } catch (error) {
    next(error);
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const requester = req.auth.employeeId;
    const requesterAccount = await User.findOne({ employeeId: requester });
    if (requesterAccount?.role === "admin") {
      next();
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Not authorized!");
    }
  } catch (error) {
    next(error);
  }
};

const verifyAllAdmin = async (req, res, next) => {
  try {
    const requester = req.auth.employeeId;
    const requesterAccount = await User.findOne({ employeeId: requester });
    if (requesterAccount?.isAdmin) {
      next();
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Not authorized!");
    }
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const requester = req.auth.employeeId;
    const requesterAccount = await User.findOne({ employeeId: requester });
    if (requesterAccount?.role === "user") {
      next();
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Not authorized!");
    }
  } catch (error) {
    next(error);
  }
};

export { auth_jwt, verifyUser, verifyAdmin, verifySuperAdmin, verifyAllAdmin };
