import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddStationController, GetAllStationController, GetAllStationPerCoopIdController, GetStationPerCoopIdAndRouteIdController, UpdateStationRowNoByIdAndCoopIdController } from "../controllers/StationController";

const StationRouter = Router();

// StationRouter.get("/station", CheckTokenMiddleware, GetAllStationController)

StationRouter.get("/station/:id", CheckTokenMiddleware, GetAllStationPerCoopIdController);

StationRouter.post("/station", CheckTokenMiddleware, AddStationController)

StationRouter.get("/station/:routeId/:coopId", CheckTokenMiddleware, GetStationPerCoopIdAndRouteIdController)

StationRouter.put("/station/rowNo/:coopId" , CheckTokenMiddleware, UpdateStationRowNoByIdAndCoopIdController)

export default StationRouter;