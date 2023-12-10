
import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddDispatchController, GetAllDispatch } from "../controllers/DispatchController";

const DispatchRouter = Router();


DispatchRouter.get("/dispatch" , CheckTokenMiddleware , GetAllDispatch)

DispatchRouter.post("/dispatch", CheckTokenMiddleware , AddDispatchController)

export default DispatchRouter;