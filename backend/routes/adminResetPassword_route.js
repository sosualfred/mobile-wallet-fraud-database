import { Router } from "express";
import { forgotPassword, verifyAdminCode, resetAdminPassword } from "../controllers/adminResetPassword_controller.js";

export const  adminPasswordRouter = Router();

adminPasswordRouter.post("/api/admin/password/recover", forgotPassword);

adminPasswordRouter.post("/api/admin/password/verify-code", verifyAdminCode);

adminPasswordRouter.post("/api/admin/password/change", resetAdminPassword);
