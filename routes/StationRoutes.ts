import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddStationController, GetAllStationController, GetAllStationPerCoopIdController } from "../controllers/StationController";

const StationRouter = Router();

// StationRouter.get("/station", CheckTokenMiddleware, GetAllStationController)

StationRouter.get("/station/:id", CheckTokenMiddleware, GetAllStationPerCoopIdController);

StationRouter.post("/station", CheckTokenMiddleware, AddStationController)

export default StationRouter;