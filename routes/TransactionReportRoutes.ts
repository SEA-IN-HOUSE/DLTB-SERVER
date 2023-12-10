import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddDataTransactionReportController, GetAllTransactionReportController } from "../controllers/TransactionReportController";

const TransactionReportRouter = Router();

TransactionReportRouter.get('/transcation-report', CheckTokenMiddleware, GetAllTransactionReportController);

TransactionReportRouter.post('/transaction-report', CheckTokenMiddleware, AddDataTransactionReportController);

export default TransactionReportRouter;