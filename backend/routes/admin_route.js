
import { Router } from "express";

import{login} from '../controllers/admin_controller.js';

import {isAuthenticated} from '../middlewares/auth.js';

const adminRouter = Router();

adminRouter.post('api/auth/login',isAuthenticated, login);