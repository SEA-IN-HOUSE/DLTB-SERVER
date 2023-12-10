
import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddVehicleController, GetAllVehicleController, GetAllVehiclePerCoopIdController } from "../controllers/VehicleController";

const VehicleRouter = Router();

// VehicleRouter.get("/vehicle" , CheckTokenMiddleware, GetAllVehicleController)
VehicleRouter.get("/vehicle/:id", CheckTokenMiddleware, GetAllVehiclePerCoopIdController);
VehicleRouter.post("/vehicle", CheckTokenMiddleware, AddVehicleController)

export default VehicleRouter;