import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateTorTicketController, CreateTorTicketWithWalletBalanceController, GetTORTicketMainByCoopIdAndDateController, GetTORTicketPerCoopIdController, GetTorTicketByCoopIdAndFilterController, SyncTORTicketController, SyncToFileMakerTORTicketController, UpdateTORTicketPerTicketNoController } from "../controllers/TORTicketController";


const TORTicketRouter = Router();

// TORTicketRouter.get('/tor/ticket', CheckTokenMiddleware , GetAllTicketController);
TORTicketRouter.get('/tor/ticket/:id', CheckTokenMiddleware, GetTORTicketPerCoopIdController)
TORTicketRouter.post('/tor/ticket' , CheckTokenMiddleware , CreateTorTicketController);
TORTicketRouter.post('/tor/ticket/:ticketNo' , CheckTokenMiddleware , CreateTorTicketWithWalletBalanceController)
TORTicketRouter.get('/sync/tor/ticket', CheckTokenMiddleware, SyncTORTicketController);
TORTicketRouter.post('/tor/main/:id', CheckTokenMiddleware, GetTORTicketMainByCoopIdAndDateController);
TORTicketRouter.post('/tor/ticket/filter/:id', CheckTokenMiddleware, GetTorTicketByCoopIdAndFilterController);
TORTicketRouter.put('/tor/ticket/:id', CheckTokenMiddleware , UpdateTORTicketPerTicketNoController);


TORTicketRouter.get('/tor/ticket/sync/:coopId', CheckTokenMiddleware, SyncToFileMakerTORTicketController);
export default TORTicketRouter;