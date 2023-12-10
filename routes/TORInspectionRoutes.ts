import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateTORInspectionController, GetTORInspectionByCoopIdAndDateController, GetTORInspectionPerCoopIdController } from "../controllers/TORInspectionController";

const TORInspectionRouter = Router();

// TORInspectionRouter.get('/tor/inspection', CheckTokenMiddleware, GetAllTORInspectionController);
TORInspectionRouter.get('/tor/inspection/:id', CheckTokenMiddleware, GetTORInspectionPerCoopIdController);
TORInspectionRouter.post('/tor/inspection', CheckTokenMiddleware, CreateTORInspectionController);
TORInspectionRouter.post('/tor/inspection/filter/:id', CheckTokenMiddleware, GetTORInspectionByCoopIdAndDateController);
export default TORInspectionRouter;