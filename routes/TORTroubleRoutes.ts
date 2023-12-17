import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateNewTorTroubleController, GetAllTorTroubleController, GetTORTroublePerCoopIdController, GetTORTroublePyCoopIdAndDateController, SyncToFileMakerTORTroubleController } from "../controllers/TORTroubleController";

const TORTroubleRouter = Router();

// TORTroubleRouter.get('/tor/trouble', CheckTokenMiddleware, GetAllTorTroubleController);

TORTroubleRouter.get('/tor/trouble/:id', CheckTokenMiddleware, GetTORTroublePerCoopIdController)

TORTroubleRouter.post('/tor/trouble', CheckTokenMiddleware, CreateNewTorTroubleController);

TORTroubleRouter.post('/tor/trouble/:id', CheckTokenMiddleware, GetTORTroublePyCoopIdAndDateController);

TORTroubleRouter.get('/tor/trouble/sync/:coopId', CheckTokenMiddleware, SyncToFileMakerTORTroubleController);

export default TORTroubleRouter;