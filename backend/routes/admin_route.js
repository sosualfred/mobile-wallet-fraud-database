import { Router } from "express";
import { createAdmin, deactivateAdmin, deleteAdmin, logout } from "../controllers/admin_controller.js";
import { createAdmin, logout, updateAdmin } from "../controllers/admin_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { login, signUp, listAdminUsers } from '../controllers/admin_controller.js';
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

adminRouter.post("/api/admin/deactivate", deactivateAdmin);

adminRouter.delete("/api/admin/delete", deleteAdmin)
// adminRouter.post('api/admin/login', isAuthenticated, login);


adminRouter.post("/api/admin/register", signUp);
adminRouter.get("/api/admin/users/list", isAuthenticated, hasPermission('canGetAdmins'), listAdminUsers);

export default adminRouter;

