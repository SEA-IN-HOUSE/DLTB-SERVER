import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateNewTorTroubleController, GetAllTorTroubleController, GetTORTroublePerCoopIdController, GetTORTroublePyCoopIdAndDateController } from "../controllers/TORTroubleController";

const TORTroubleRouter = Router();

// TORTroubleRouter.get('/tor/trouble', CheckTokenMiddleware, GetAllTorTroubleController);

TORTroubleRouter.get('/tor/trouble/:id', CheckTokenMiddleware, GetTORTroublePerCoopIdController)

TORTroubleRouter.post('/tor/trouble', CheckTokenMiddleware, CreateNewTorTroubleController);

TORTroubleRouter.post('/tor/trouble/:id', CheckTokenMiddleware, GetTORTroublePyCoopIdAndDateController);

export default TORTroubleRouter;