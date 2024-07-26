import express from "express";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_route.js";

const app = express();

dbConnection();

// Use middlewares
app.use(express.json());

// Use routes
app.use(userRouter);

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
