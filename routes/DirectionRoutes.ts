import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddNewDirectionController, GetAllDirectionPerCoopIdController, GetAllDirectionsController } from "../controllers/DirectionController";

const DirectionRouter = Router();

// DirectionRouter.get("/directions", CheckTokenMiddleware, GetAllDirectionsController);
DirectionRouter.get("/directions/:id", CheckTokenMiddleware, GetAllDirectionPerCoopIdController);
DirectionRouter.post("/directions", CheckTokenMiddleware, AddNewDirectionController);

export default DirectionRouter;