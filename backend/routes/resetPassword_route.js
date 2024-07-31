import {Router} from "express"
import { forgotPassword, verifyCode } from "../controllers/resetPassword_controller.js";

export const passwordRouter = Router();

passwordRouter.post('/api/auth/password/recover', forgotPassword);

passwordRouter.post('/api/auth/password/verify-code', verifyCode);