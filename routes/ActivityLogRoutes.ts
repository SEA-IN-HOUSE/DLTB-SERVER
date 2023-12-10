import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateActivityLogController, GetActivityLogByCoopIdController } from "../controllers/ActivityLogController";

const ActivityLogRouter = Router();

ActivityLogRouter.get("/activity-log/:id", CheckTokenMiddleware, GetActivityLogByCoopIdController);

ActivityLogRouter.post("/activity-log", CheckTokenMiddleware, CreateActivityLogController)

export default ActivityLogRouter;