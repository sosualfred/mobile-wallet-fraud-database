import { Router } from "express";
import { createAdmin, logout } from "../controllers/admin_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { login, signUp } from '../controllers/admin_controller.js';
import { hasPermission } from "../middlewares/auth.js";


export const adminRouter = Router();

adminRouter.post('/api/admin/login', login);
adminRouter.post("/api/admin/logout", isAuthenticated, logout);

adminRouter.put("/api/admin/users/update/:adminId", isAuthenticated, hasPermission("approve_fraudReport",
    "delete_fraudReport",
    "set_apikeyusagelimit",
    "set_domainrestrictions",
    "deactivate_useraccount",
    "set_systemconfiguration",
    "add_admin",
    "remove_admin"
), updateAdmin);

adminRouter.post("/api/admin/users/add", isAuthenticated, hasPermission('canManageAdmins'), createAdmin);

adminRouter.post("/api/admin/register", signUp);

export default adminRouter;

