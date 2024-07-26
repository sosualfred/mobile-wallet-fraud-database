import { Router } from "express";
import { signUp, token } from "../controllers/user_controller.js";
import jwt from "jsonwebtoken"

export const userRouter = Router();

userRouter.post("/api/auth/register", signUp);

userRouter.post('/api/auth/login', token)
