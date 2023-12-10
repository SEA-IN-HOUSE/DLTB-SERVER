
import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddCooperativeEmployeeController, GetAllCooperativeEmployeeController } from "../controllers/CooperativeEmployeeController";

const CooperativeEmployeeRouter = Router();

CooperativeEmployeeRouter.get("/coop-employee" , CheckTokenMiddleware, GetAllCooperativeEmployeeController);

CooperativeEmployeeRouter.post("/coop-employee" , CheckTokenMiddleware, AddCooperativeEmployeeController);

export default CooperativeEmployeeRouter;
 