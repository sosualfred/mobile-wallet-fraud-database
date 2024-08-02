import { Router } from "express";
import {
  addFraudReport,
  getAFraudReport,
  updateFraudReport,
} from "../controllers/fraudReport_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const fraudReportRouter = Router();

fraudReportRouter.post("/api/fraud/report", isAuthenticated, addFraudReport);

fraudReportRouter.put(
  "/api/fraud/reports/update/:reportId",
  isAuthenticated,
  updateFraudReport
);

fraudReportRouter.get(
  "/api/fraud/reports/:reportId",
  isAuthenticated,
  getAFraudReport
);
