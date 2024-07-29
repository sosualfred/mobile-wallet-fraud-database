import { Router } from "express";
import { signUp, token, logout } from "../controllers/user_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";


export const userRouter = Router();

userRouter.post("/api/auth/register", signUp);

userRouter.post('/api/auth/login', token)

userRouter.post("/api/auth/logout", isAuthenticated, logout);
