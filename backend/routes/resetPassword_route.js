import {Router} from "express"
import { resetPassword } from "../controllers/resetPassword_controller.js";

export const passwordRouter = Router();

passwordRouter.post('/api/auth/password/recover', resetPassword)