import { Router } from "express";

import { CreateActivityController } from "../../../../modules/company/activities/useCases/createActivity/CreateActivityController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const activitiesRoutes = Router();

const createActivityController = new CreateActivityController();

activitiesRoutes.use(ensureAuthenticated);

activitiesRoutes.post("/", createActivityController.handle);

export { activitiesRoutes };
