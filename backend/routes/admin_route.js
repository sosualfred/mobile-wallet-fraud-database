
import { Router } from "express";
import { logout } from "../controllers/admin_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import{login, signUp} from '../controllers/admin_controller.js';

const adminRouter = Router();


adminRouter.post('api/auth/login',isAuthenticated, login);

adminRouter.post("/api/admin/logout", /*isAuthenticated*/ logout);


adminRouter.post("/api/admin/register", signUp);

adminRouter.post('api/admin/login',isAuthenticated, login);


export default adminRouter;

