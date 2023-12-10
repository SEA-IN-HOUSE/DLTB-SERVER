import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddEmailController, CheckOTPController, GetAllEmailOTPController } from "../controllers/EmailOTPControllert";

const EmailOTPRouter = Router();

EmailOTPRouter.get("/email-otp", CheckTokenMiddleware, GetAllEmailOTPController);
EmailOTPRouter.post("/email-otp", CheckTokenMiddleware, AddEmailController);
EmailOTPRouter.post("/validate-otp", CheckTokenMiddleware, CheckOTPController);
export default EmailOTPRouter;