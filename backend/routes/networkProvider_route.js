import { Router } from "express";
import { checkLimitEndpoint, getNetworkProvider } from "../controllers/networkProvider_controller.js";

const networkProviderRouter = Router();

networkProviderRouter.get('/api/utils/network-provider', getNetworkProvider);
networkProviderRouter.get('/api/reports/check-limit', checkLimitEndpoint);




export default networkProviderRouter