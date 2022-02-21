import { Router } from "express";

import { CreatePilarController } from "../../../../modules/company/pilars/useCases/CreatePilarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const pilarsRoutes = Router();

const createPilarController = new CreatePilarController();

pilarsRoutes.use(ensureAuthenticated);

pilarsRoutes.post("/", createPilarController.handle);

export { pilarsRoutes };
