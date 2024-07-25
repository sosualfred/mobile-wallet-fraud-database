import { Router } from "express";
import { signUp } from "../controllers/user_controller.js";

export const userRouter = Router();

userRouter.post("/api/auth/register", signUp);
