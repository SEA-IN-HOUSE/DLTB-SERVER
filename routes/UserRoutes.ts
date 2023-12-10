import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { AddUserContorller, GetAllUserController, GetUserByCompanyIdController, GetUserByIdController, UpdateUserByIdController } from "../controllers/UserController";

const UserRouter = Router();


// UserRouter.get("/user", CheckTokenMiddleware , GetAllUserController)

UserRouter.get("/user/:id", CheckTokenMiddleware , GetUserByCompanyIdController)

UserRouter.post("/user", CheckTokenMiddleware, AddUserContorller);

UserRouter.put("/user/:id", CheckTokenMiddleware, UpdateUserByIdController);


export default UserRouter;