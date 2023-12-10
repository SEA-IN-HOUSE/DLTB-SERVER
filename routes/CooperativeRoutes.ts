import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddCooperativeController, GetAllCooperativeController, GetCooperativePerIdController } from "../controllers/CooperativeController";

const CooperativeRouter = Router();

CooperativeRouter.get("/cooperative", CheckTokenMiddleware, GetAllCooperativeController);

CooperativeRouter.post("/cooperative", CheckTokenMiddleware, AddCooperativeController);

CooperativeRouter.get("/cooperative/:id", CheckTokenMiddleware, GetCooperativePerIdController);

export default CooperativeRouter;