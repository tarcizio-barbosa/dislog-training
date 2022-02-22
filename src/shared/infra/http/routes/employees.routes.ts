import { Router } from "express";

import { CreateEmployeeController } from "../../../../modules/company/employees/useCases/createEmployee/CreateEmployeeController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const employeesRoutes = Router();

const createEmployeeController = new CreateEmployeeController();

employeesRoutes.use(ensureAuthenticated);

employeesRoutes.post("/", createEmployeeController.handle);

export { employeesRoutes };
