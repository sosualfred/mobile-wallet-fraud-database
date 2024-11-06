import { Router } from "express";
import { getNetworkProvider } from "../controllers/networkProvider_controller.js";

const networkProviderRouter = Router();

networkProviderRouter.get('/api/utils/network-provider', getNetworkProvider)




export default networkProviderRouter