import express from "express";
import { dbConnection } from "./config/db.js";

const app = express();

dbConnection();

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
