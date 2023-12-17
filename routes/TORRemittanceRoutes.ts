import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateTORRemittanceController, GetAllRemittanceController, GetTORRemittanceByCoopIdAndDateController, GetTORRemittancePerCoopIdController, SyncGetAllTORRemittanceController, SyncToFileMakerTORRemittanceController } from "../controllers/TORRemittanceController";

const TORRemittanceRouter = Router();

// TORRemittanceRouter.get('/sync/tor/remittance', CheckTokenMiddleware, SyncGetAllTORRemittanceController )

// TORRemittanceRouter.get('/tor/remittance', CheckTokenMiddleware, GetAllRemittanceController);

TORRemittanceRouter.post('/tor/remittance', CheckTokenMiddleware, CreateTORRemittanceController);

TORRemittanceRouter.get('/tor/remittance/:id', CheckTokenMiddleware, GetTORRemittancePerCoopIdController);

TORRemittanceRouter.post('/tor/remittance/:id', CheckTokenMiddleware, GetTORRemittanceByCoopIdAndDateController);


TORRemittanceRouter.post('/tor/remittance/filter/:id', CheckTokenMiddleware, GetTORRemittancePerCoopIdController)

TORRemittanceRouter.get('/tor/remittance/sync/:coopId', CheckTokenMiddleware, SyncToFileMakerTORRemittanceController);

export default TORRemittanceRouter;