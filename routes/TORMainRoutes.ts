import { Router } from "express";
import { CheckTokenMiddleware } from "../middlewares/CheckTokenMiddleware";
import { CreateNewTORMAINController, GetAllDataPerCoopIdController, GetTORMainByCoopIdAndDateController, GetTorMainByCoopIdAndFilterController, PatchTORMAINController, SyncToFileMakerTORMainController, SyncTorMainController, UpdateTORMainFinalRemittanceByTorNoController } from "../controllers/TorMainController";

const TORMainRouter = Router();

// TORMainRouter.get('/tor/main',CheckTokenMiddleware, GetAllTORMainController);

// TORMainRouter.get('/tor/main/:id', CheckTokenMiddleware, GetAllDataPerCoopIdController);

// TORMainRouter.post('/tor/main', CheckTokenMiddleware, SearchForTORMAINController);
TORMainRouter.post('/tor/main/', CheckTokenMiddleware,  CreateNewTORMAINController);
TORMainRouter.get('/tor/main', CheckTokenMiddleware,)

TORMainRouter.patch('/tor/main/:id', CheckTokenMiddleware, PatchTORMAINController);

// TORMainRouter.put('/tor/main', CheckTokenMiddleware, () =>{});

TORMainRouter.get('/tor/main/:id' , CheckTokenMiddleware, GetAllDataPerCoopIdController);

TORMainRouter.post('/tor/main/:id', CheckTokenMiddleware, GetTORMainByCoopIdAndDateController);

TORMainRouter.post('/tor/main/filter/:id', CheckTokenMiddleware, GetTorMainByCoopIdAndFilterController);

TORMainRouter.get('/sync/tor/main' , CheckTokenMiddleware, SyncTorMainController); 

TORMainRouter.put('/tor/main/final-remittance/:torNo', CheckTokenMiddleware, UpdateTORMainFinalRemittanceByTorNoController);

TORMainRouter.get('/tor/main/sync/:coopId', CheckTokenMiddleware, SyncToFileMakerTORMainController);

export default TORMainRouter;