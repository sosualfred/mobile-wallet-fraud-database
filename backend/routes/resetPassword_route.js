import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  resetPassword,
  verifyCode,
} from "../controllers/resetPassword_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const passwordRouter = Router();

passwordRouter.post("/api/auth/password/recover", forgotPassword);

passwordRouter.post("/api/auth/password/verify-code", verifyCode);

passwordRouter.post('/api/auth/change-password', isAuthenticated, changePassword);

passwordRouter.post("/api/auth/password/change", resetPassword);
