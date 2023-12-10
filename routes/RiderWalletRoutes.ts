

import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddRiderWalletController, GetAllRiderWalletController, GetRiderWalletBalanceController, GetRiderWalletPerIdController, UpdateRiderWalletBalanceController } from "../controllers/RiderWalletController";


const RiderWalletRouter = Router();

RiderWalletRouter.get("/riderwallet", CheckTokenMiddleware, GetAllRiderWalletController)

// RiderWalletRouter.get("/riderwallet/:cardId", CheckTokenMiddleware, GetRiderWalletPerIdController);

RiderWalletRouter.post("/riderwallet" , CheckTokenMiddleware, AddRiderWalletController)

RiderWalletRouter.put("/riderwallet", CheckTokenMiddleware, UpdateRiderWalletBalanceController)

RiderWalletRouter.get("/riderwallet/balance/:cardId/:cardType/:coopId" ,CheckTokenMiddleware, GetRiderWalletBalanceController);

export default RiderWalletRouter;