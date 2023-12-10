
import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateNewEmployeeCardController, GetAllEmployeeCardController, GetAllEmployeeCardPerCoopId } from "../controllers/EmployeeCardController";

const EmployeeCardRouter = Router();

// EmployeeCardRouter.get("/employeecard" , CheckTokenMiddleware, GetAllEmployeeCardController);

EmployeeCardRouter.get("/employeecard/:id", CheckTokenMiddleware, GetAllEmployeeCardPerCoopId);

EmployeeCardRouter.post("/employeecard" , CheckTokenMiddleware, CreateNewEmployeeCardController);

export default EmployeeCardRouter;