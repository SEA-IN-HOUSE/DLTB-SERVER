import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { NewBalanceTorTicketController } from "../controllers/BalanceTorTicketController";

const BalanceTorTicketRouter = Router();

BalanceTorTicketRouter.post("/balancetorticket", CheckTokenMiddleware, NewBalanceTorTicketController)

export default BalanceTorTicketRouter;