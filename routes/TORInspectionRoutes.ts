import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateTORInspectionController, GetTORInspectionByCoopIdAndDateController, GetTORInspectionPerCoopIdController, SyncToFileMakerTORInspectionController } from "../controllers/TORInspectionController";

const TORInspectionRouter = Router();

// TORInspectionRouter.get('/tor/inspection', CheckTokenMiddleware, GetAllTORInspectionController);
TORInspectionRouter.get('/tor/inspection/:id', CheckTokenMiddleware, GetTORInspectionPerCoopIdController);
TORInspectionRouter.post('/tor/inspection', CheckTokenMiddleware, CreateTORInspectionController);
TORInspectionRouter.post('/tor/inspection/filter/:id', CheckTokenMiddleware, GetTORInspectionByCoopIdAndDateController);

TORInspectionRouter.get('/tor/inspection/sync/:coopId', CheckTokenMiddleware, SyncToFileMakerTORInspectionController);
export default TORInspectionRouter;