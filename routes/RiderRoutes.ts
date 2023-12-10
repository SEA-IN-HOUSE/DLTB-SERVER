
import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddRiderController, GetAllRiderController, GetRiderByCardIdController } from "../controllers/RiderController";

const RiderRouter = Router();

RiderRouter.get("/rider", CheckTokenMiddleware, GetAllRiderController)

RiderRouter.post("/rider", CheckTokenMiddleware , AddRiderController)

RiderRouter.get("/rider/:id", CheckTokenMiddleware, GetRiderByCardIdController);

export default RiderRouter;