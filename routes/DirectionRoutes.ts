import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddNewDirectionController, GetAllDirectionPerCoopIdController, GetAllDirectionsController, GetDirectionByCoopIdAndFilterController } from "../controllers/DirectionController";

const DirectionRouter = Router();

// DirectionRouter.get("/directions", CheckTokenMiddleware, GetAllDirectionsController);
DirectionRouter.get("/directions/:id", CheckTokenMiddleware, GetAllDirectionPerCoopIdController);
DirectionRouter.post("/directions", CheckTokenMiddleware, AddNewDirectionController);
DirectionRouter.post("/directions/filter/:coopId", CheckTokenMiddleware, GetDirectionByCoopIdAndFilterController);

export default DirectionRouter;