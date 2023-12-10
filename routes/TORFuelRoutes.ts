import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateTORFuelController, GetAllTORFuelController, GetDataPerCoopIdController, GetTORFuelByCoopIdAndDateController, SyncGetAllTorFuelController } from "../controllers/TORFuelController";

const TORFuelRouter = Router();

// TORFuelRouter.get('/tor/fuel', CheckTokenMiddleware, GetAllTORFuelController);
TORFuelRouter.get('/tor/fuel/:id', CheckTokenMiddleware, GetDataPerCoopIdController);
// TORFuelRouter.get('/sync/tor/fuel', CheckTokenMiddleware, SyncGetAllTorFuelController)
TORFuelRouter.post('/tor/fuel', CheckTokenMiddleware, CreateTORFuelController);
TORFuelRouter.post('/tor/main/:id', CheckTokenMiddleware, GetTORFuelByCoopIdAndDateController);
export default TORFuelRouter;