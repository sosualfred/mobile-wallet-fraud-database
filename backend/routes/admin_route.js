
import { Router } from "express";
import { logout } from "../controllers/admin_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const adminRouter = Router();


adminRouter.post('api/auth/login',isAuthenticated, login);

adminRouter.post("/api/admin/logout", /*isAuthenticated*/ logout);



export default adminRouter;
