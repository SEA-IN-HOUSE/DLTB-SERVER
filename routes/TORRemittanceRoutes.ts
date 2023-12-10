import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateTORRemittanceController, GetAllRemittanceController, GetTORRemittanceByCoopIdAndDateController, GetTORRemittancePerCoopIdController, SyncGetAllTORRemittanceController } from "../controllers/TORRemittanceController";

const TORRemittanceRouter = Router();

// TORRemittanceRouter.get('/sync/tor/remittance', CheckTokenMiddleware, SyncGetAllTORRemittanceController )

// TORRemittanceRouter.get('/tor/remittance', CheckTokenMiddleware, GetAllRemittanceController);

TORRemittanceRouter.post('/tor/remittance', CheckTokenMiddleware, CreateTORRemittanceController);

TORRemittanceRouter.get('/tor/remittance/:id', CheckTokenMiddleware, GetTORRemittancePerCoopIdController);

TORRemittanceRouter.post('/tor/remittance/:id', CheckTokenMiddleware, GetTORRemittanceByCoopIdAndDateController);


TORRemittanceRouter.post('/tor/remittance/filter/:id', CheckTokenMiddleware, GetTORRemittancePerCoopIdController)

export default TORRemittanceRouter;