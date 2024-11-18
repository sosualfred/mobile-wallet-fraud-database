import { Router } from "express";
import {
  signUp,
  token,
  logout,
  refreshToken,
  getUserProfile,
  verifyEmail,
  deactivateUserAccount,
  initiateGoogleOAuth,
  handleGoogleCallback,
} from "../controllers/user_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.post("/api/auth/register", signUp);

userRouter.post("/api/auth/google", initiateGoogleOAuth);

userRouter.get("/api/auth/google/callback", handleGoogleCallback);

userRouter.post("/api/auth/login", token);

userRouter.post("/api/auth/logout", isAuthenticated, logout);

userRouter.post("/refresh-token", isAuthenticated, refreshToken);

userRouter.get("/api/auth/me", isAuthenticated, getUserProfile);

userRouter.post("/api/auth/verify-email", verifyEmail);

userRouter.post("/api/users/deactivate", isAuthenticated, deactivateUserAccount);

userRouter.post(
  "/api/users/deactivate",
  isAuthenticated,
  deactivateUserAccount
);

