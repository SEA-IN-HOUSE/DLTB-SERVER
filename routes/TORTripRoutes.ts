import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateTORTripController,  GetTORTripPerCoopIdController, GetTorTripByCoopIdAndFilterController, UpdateTORTripByControlNoController } from "../controllers/TORTripController";
import { GetTORRemittanceByCoopIdAndDateController } from "../controllers/TORRemittanceController";

const TORTripRouter = Router();
TORTripRouter.get('/tor/trip/:id', CheckTokenMiddleware, GetTORTripPerCoopIdController)
// TORTripRouter.get('/tor/trip', CheckTokenMiddleware, GetAllTORTripController)
TORTripRouter.post('/tor/trip' , CheckTokenMiddleware, CreateTORTripController );

TORTripRouter.post('/tor/trip/:id', CheckTokenMiddleware, GetTORRemittanceByCoopIdAndDateController);

TORTripRouter.put('/tor/trip/:id', CheckTokenMiddleware, UpdateTORTripByControlNoController);

TORTripRouter.post('/tor/trip/filter/:id', CheckTokenMiddleware, GetTorTripByCoopIdAndFilterController)

export default TORTripRouter;