import { Router } from "express";
import { generateApiKey, getApiKeys } from "../controllers/api_controller.js";
import { deleteApi, generateApiKey } from "../controllers/api_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { apiKeyRateLimiter } from "../Utils/api_key_rate_limiter.js";

export const apiRouter = Router();

apiRouter.post(
  "/api/keys/generate",
  isAuthenticated,
  apiKeyRateLimiter,
  generateApiKey
);


apiRouter.get("/api/keys", isAuthenticated, getApiKeys);

   
apiRouter.delete("/api/keys/:id", isAuthenticated, deleteApi)

