import { Router } from "express";
import { AuthenticationController, GetUserByEmailController } from "../controllers/AuthenticationController";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";

const AuthRouter = Router();


/////////////////////////////
// AUTHENTICATION
////////////////////////////


AuthRouter.post('/auth',  AuthenticationController)

AuthRouter.get('/auth/:email', CheckTokenMiddleware, GetUserByEmailController);

export default AuthRouter;