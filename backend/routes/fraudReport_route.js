import { Router } from "express";
import { addFraudReport, deleteFraudReport } from "../controllers/fraudReport_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const fraudReportRouter = Router();

fraudReportRouter.post("/api/fraud/report", isAuthenticated, addFraudReport);
fraudReportRouter.delete("/api/fraud/reports/delete/:reportId",isAuthenticated, deleteFraudReport);

