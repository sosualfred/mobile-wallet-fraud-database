import { Router } from "express";
import { addFraudReport, updateFraudReport } from "../controllers/fraudReport_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const fraudReportRouter = Router();

fraudReportRouter.post("/api/fraud/report", isAuthenticated, addFraudReport);

fraudReportRouter.put("/api/fraud/reports/update/:reportId", isAuthenticated, updateFraudReport)
