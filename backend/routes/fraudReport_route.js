import { Router } from "express";

import {
  addFraudReport,
  checkANumber,
  deleteFraudReport,
  updateFraudReport,
  getAFraudReport,
  getFraudReports,
  getPublicFraudReports,
  searchFraudReport,
  addNewReport,
} from "../controllers/fraudReport_controller.js";

import { isAuthenticated } from "../middlewares/auth.js";
import { fraudReportUpload } from "../middlewares/upload.js";

export const fraudReportRouter = Router();

fraudReportRouter.post(
  "/api/fraud/report",
  isAuthenticated,
  fraudReportUpload.fields([
    { name: "fraudImage", maxCount: 1 },
    { name: "fraudEvidence", maxCount: 1 },
  ]),
  addFraudReport
);

// fraudReportRouter.post("/api/fraud/report", isAuthenticated, addFraudReport);

fraudReportRouter.delete(
  "/api/fraud/reports/delete/:reportId",
  isAuthenticated,
  deleteFraudReport
);

fraudReportRouter.put(
  "/api/fraud/reports/update/:reportId",
  isAuthenticated,
  updateFraudReport
);
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

fraudReportRouter.get("/api/fraud/check/:phone", isAuthenticated, checkANumber);

fraudReportRouter.get("/api/fraud/reports", isAuthenticated, getFraudReports);

fraudReportRouter.get("/api/public/fraud/reports", getPublicFraudReports);

fraudReportRouter.get("/api/fraud/search/:phoneNumber", searchFraudReport);

fraudReportRouter.post("/api/fraud/report", addNewReport);
