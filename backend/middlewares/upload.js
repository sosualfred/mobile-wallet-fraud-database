import { multerSaveFilesOrg } from "multer-savefilesorg";
import multer from "multer";

export const fraudReportUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/fraud_report_uploads/*",
  }),
});
