import { Router } from "express";

import { CreateAreaController } from "../../../../modules/company/areas/useCases/createArea/CreateAreaController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const areasRoutes = Router();

const createAreaController = new CreateAreaController();

areasRoutes.use(ensureAuthenticated);

areasRoutes.post("/", createAreaController.handle);

export { areasRoutes };
