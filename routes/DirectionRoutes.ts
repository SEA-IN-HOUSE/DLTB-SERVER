import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddNewDirectionController, DeleteDirectionByIdController, GetAllDirectionPerCoopIdController, GetAllDirectionsController, GetDirectionByCoopIdAndFilterController, UpdateDirectionByIdController } from "../controllers/DirectionController";

const DirectionRouter = Router();

// DirectionRouter.get("/directions", CheckTokenMiddleware, GetAllDirectionsController);
DirectionRouter.get("/directions/:id", CheckTokenMiddleware, GetAllDirectionPerCoopIdController);
DirectionRouter.post("/directions", CheckTokenMiddleware, AddNewDirectionController);
DirectionRouter.post("/directions/filter/:coopId", CheckTokenMiddleware, GetDirectionByCoopIdAndFilterController);
DirectionRouter.put("/directions/:id", CheckTokenMiddleware, UpdateDirectionByIdController)
DirectionRouter.delete("/directions/:id", CheckTokenMiddleware, DeleteDirectionByIdController);

export default DirectionRouter;