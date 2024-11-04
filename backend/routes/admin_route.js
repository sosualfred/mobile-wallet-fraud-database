
import { Router } from "express";
import { createAdmin, logout } from "../controllers/admin_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { login, signUp } from '../controllers/admin_controller.js';
import { hasPermission } from "../middlewares/auth.js";

export const adminRouter = Router();


adminRouter.post('/api/admin/login', login);

adminRouter.post("/api/admin/logout", /*isAuthenticated*/ logout);

adminRouter.post("/api/admin/users/add", isAuthenticated, hasPermission('canManageAdmins'), createAdmin);

adminRouter.post("/api/admin/register", signUp);

// adminRouter.post('api/admin/login', isAuthenticated, login);


export default adminRouter;

