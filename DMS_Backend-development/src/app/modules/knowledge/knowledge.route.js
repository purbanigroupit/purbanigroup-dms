import express from "express";
import auth from "../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/user.js";
import { pdfAndVideoUploader } from "../../middleware/multer.js";
import { KnowledgeValidation } from "./knowledge.validation.js";
import validateRequest from "../../middleware/validateRequest.js";
import { KnowledgeController } from "./knowledge.controller.js";
const router = express.Router();

router.post(
  "/upload-knowledge-pdf",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(KnowledgeValidation.uploadKnowledgeZodSchema),
  KnowledgeController.uploadKnowledge
);

router.get(
  "/get-all-knowledge",
  auth(
    null,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.USER
  ),
  KnowledgeController.getAllKnowledge
);

router.delete(
  "/delete-one-knowledge/:id",
  auth(null, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  KnowledgeController.deleteOneKnowledge
);

export const KnowledgeRoutes = router;
