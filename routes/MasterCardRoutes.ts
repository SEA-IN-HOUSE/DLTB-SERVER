import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import {  AddNewMasterCardController, GetAllMasterCardByCoopIdController, GetAllMasterCardController } from "../controllers/MasterCardController";

const MasterCardRouter = Router();

// MasterCardRouter.get('/mastercard', CheckTokenMiddleware, GetAllMasterCardController);
MasterCardRouter.post('/mastercard', CheckTokenMiddleware, AddNewMasterCardController);
MasterCardRouter.get('/mastercard/:id' , CheckTokenMiddleware, GetAllMasterCardByCoopIdController);

export default MasterCardRouter;