import { Router } from "express";

import { CreateTrainingController } from "../../../../modules/trainings/useCases/createTraining/CreateTrainingController";
import { GetTrainingsController } from "../../../../modules/trainings/useCases/getTrainings/GetTrainingsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const trainingsRoutes = Router();

const createTrainingController = new CreateTrainingController();
const getTrainingsController = new GetTrainingsController();

trainingsRoutes.use(ensureAuthenticated);

trainingsRoutes.post("/", createTrainingController.handle);
trainingsRoutes.get("/", getTrainingsController.handle);

export { trainingsRoutes };
