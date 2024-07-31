import { Router } from "express";
import { addFraudReport } from "../controllers/fraudReport_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const fraudReportRouter = Router();

fraudReportRouter.post("/api/fraud/report", isAuthenticated, addFraudReport);
