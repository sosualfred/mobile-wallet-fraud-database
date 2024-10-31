
import { Router } from "express";

import{login, signUp} from '../controllers/admin_controller.js';

import {isAuthenticated} from '../middlewares/auth.js';

export const adminRouter = Router();

adminRouter.post("/api/admin/register", signUp);


adminRouter.post('api/admin/login',isAuthenticated, login);

