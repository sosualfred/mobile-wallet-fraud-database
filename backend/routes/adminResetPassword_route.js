import { Router } from "express";
import { forgotPassword, verifyAdminCode } from "../controllers/adminResetPassword_controller.js";

export const  adminPasswordRouter = Router();

adminPasswordRouter.post("/api/admin/password/recover", forgotPassword);

adminPasswordRouter.post("/api/admin/password/verify-code", verifyAdminCode);
