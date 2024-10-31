import { Router } from "express";
import { forgotPassword } from "../controllers/adminResetPassword_controller.js";

export const  adminPasswordRouter = Router();

adminPasswordRouter.post("/api/admin/password/recover", forgotPassword);
