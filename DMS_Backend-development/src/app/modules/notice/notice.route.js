import express from "express";
import { NoticeController } from "./notice.controller.js";
import { pdfUploader } from "../../middleware/multer.js";
import { ENUM_USER_ROLE } from "../../../enums/user.js";
import { NoticeValidation } from "./notice.validation.js";
import validateRequest from "../../middleware/validateRequest.js";
import auth from "../../middleware/auth.js";
const router = express.Router();

router.post(
  "/upload-notice-pdf",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  pdfUploader,
  validateRequest(NoticeValidation.uploadNoticeZodSchema),
  NoticeController.uploadNotice
);

router.get(
  "/get-all-notice",
  auth(
    null,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  NoticeController.getAllNotice
);

router.delete(
  "/delete-one-notice/:id",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  NoticeController.deleteOneNotice
);

export const NoticeRoutes = router;
