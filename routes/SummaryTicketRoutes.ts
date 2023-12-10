import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { GetByFilterSummaryTicketController, GetDataByReferenceNoSummaryTicketController } from "../controllers/SummaryTicketController";

const SummaryTicketRouter = Router();

SummaryTicketRouter.post('/summary-ticket/filter', CheckTokenMiddleware, GetByFilterSummaryTicketController);

SummaryTicketRouter.get('/summary-ticket/reference-no/:id', CheckTokenMiddleware, GetDataByReferenceNoSummaryTicketController)

export default SummaryTicketRouter;