import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateNewTorViolationController, GetAllTorViolationController, GetTorViolationByCoopIdAndFilterController } from "../controllers/TORViolationController";

const TORViolationRouter = Router();


// TORViolationRouter.get('/tor/violation', CheckTokenMiddleware, GetAllTorViolationController);
TORViolationRouter.get('/tor/violation/:id', CheckTokenMiddleware, GetAllTorViolationController);

TORViolationRouter.post('/tor/violation', CheckTokenMiddleware, CreateNewTorViolationController);

TORViolationRouter.post('/tor/violation/filter/:id', CheckTokenMiddleware, GetTorViolationByCoopIdAndFilterController);

export default TORViolationRouter;