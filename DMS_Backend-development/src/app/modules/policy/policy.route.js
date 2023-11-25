import express from "express";
import { PolicyController } from "./policy.controller.js";
import { pdfUploader } from "../../middleware/multer.js";
import { ENUM_USER_ROLE } from "../../../enums/user.js";
import auth from "../../middleware/auth.js";
import validateRequest from "../../middleware/validateRequest.js";
import { PolicyValidation } from "./policy.validation.js";
const router = express.Router();

router.post(
  "/upload-policy-pdf",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  pdfUploader,
  validateRequest(PolicyValidation.uploadPolicyZodSchema),
  PolicyController.uploadPolicy
);

router.get(
  "/get-all-policy",
  auth(
    null,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  PolicyController.getAllPolicy
);

router.delete(
  "/delete-one-policy/:id",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  PolicyController.deleteOnePolicy
);

export const PolicyRoutes = router;
