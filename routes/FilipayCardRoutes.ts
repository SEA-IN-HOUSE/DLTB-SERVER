import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { GetFilipayCardController, UpdateMasterCardAndFilipayCardController } from "../controllers/FilipayCardController";

const FilipayCardRouter = Router();

FilipayCardRouter.get("/filipaycard" , CheckTokenMiddleware, GetFilipayCardController)
FilipayCardRouter.put("/filipaycard/mastercard/" , CheckTokenMiddleware, UpdateMasterCardAndFilipayCardController)
export default FilipayCardRouter;