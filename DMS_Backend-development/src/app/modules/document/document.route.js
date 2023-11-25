import express from "express";
import { DocumentController } from "./document.controller.js";
import { pdfUploader } from "../../middleware/multer.js";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/user.js";
import validateRequest from "../../middleware/validateRequest.js";
import { DocumentValidation } from "./document.validation.js";
const router = express.Router();

router.post(
  "/upload-document-pdf",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  pdfUploader,
  validateRequest(DocumentValidation.uploadDocumentZodSchema),
  DocumentController.uploadDocument
);

router.get(
  "/get-all-document",
  auth(
    null,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  DocumentController.getAllDocument
);

router.delete(
  "/delete-one-document/:id",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  DocumentController.deleteOneDocument
);

export const DocumentRoutes = router;
