import express from "express";
import { UserController } from "./user.controller.js";
import { UserValidation } from "./user.validation.js";
import validateRequest from "../../middleware/validateRequest.js";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/user.js";
import { imageUploader } from "../../middleware/multer.js";
const router = express.Router();

router.post(
  "/create-user",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  imageUploader,
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get(
  "/get-one-user",
  auth(
    null,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  UserController.getLoggedInUser
);

router.get(
  "/get-all-user",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUser
);

router.get(
  "/get-user/:email",
  auth(
    null,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  UserController.getAUser
);

router.put(
  "/update-one-user/:id",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateOneUser
);

router.put(
  "/remove-knowledge-access/:id",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateOneUser
);

router.delete(
  "/delete-one-user/:id",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.deleteOneUser
);

export const UserRoutes = router;
