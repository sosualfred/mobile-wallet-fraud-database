import { Router } from "express";
import { logout, login, updateAdmin } from "../controllers/admin_controller.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";

const adminRouter = Router();


adminRouter.post("/api/admin/login", isAuthenticated, login);

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



export default adminRouter;
