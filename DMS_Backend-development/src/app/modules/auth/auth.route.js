import express from "express";
const router = express.Router();
import validateRequest from "../../middleware/validateRequest.js";
import { AuthValidation } from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";

router.post(
  "/login",
  validateRequest(AuthValidation.authZodSchema),
  AuthController.login
);


export const AuthRoutes = router;
