import {Router} from 'express'
import { CheckTokenMiddleware } from '../middlewares/CheckTokenMiddleware';
import { AddDeviceController,  GetAllDevicePerCoopId,  GetCoopPerDeviceIdController, GetDevicePerDeviceIdController } from '../controllers/DeviceController';

const DeviceRouter = Router();

// DeviceRouter.get("/device", CheckTokenMiddleware, GetAllDeviceController);

DeviceRouter.get("/device/deviceId/:id", CheckTokenMiddleware, GetDevicePerDeviceIdController)

DeviceRouter.get("/device/:id", CheckTokenMiddleware, GetAllDevicePerCoopId);

DeviceRouter.post("/device", CheckTokenMiddleware, AddDeviceController);

DeviceRouter.get("/device/coop/:id", CheckTokenMiddleware, GetCoopPerDeviceIdController)


export default DeviceRouter;