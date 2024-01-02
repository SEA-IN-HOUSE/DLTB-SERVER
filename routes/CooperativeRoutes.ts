import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddCooperativeController, GetAllCooperativeController, GetCooperativePerIdController, UpdateCooperativeByIdAndCoopIdController } from "../controllers/CooperativeController";

const CooperativeRouter = Router();

CooperativeRouter.get("/cooperative", CheckTokenMiddleware, GetAllCooperativeController);

CooperativeRouter.post("/cooperative", CheckTokenMiddleware, AddCooperativeController);

CooperativeRouter.get("/cooperative/:id", CheckTokenMiddleware, GetCooperativePerIdController);

CooperativeRouter.put("/cooperative/:id", CheckTokenMiddleware, UpdateCooperativeByIdAndCoopIdController);

export default CooperativeRouter;