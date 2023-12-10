import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { VerifyBookingController } from "../controllers/BookController";


const BookRouter = Router();


BookRouter.post("/booking", CheckTokenMiddleware, VerifyBookingController);


export default BookRouter;