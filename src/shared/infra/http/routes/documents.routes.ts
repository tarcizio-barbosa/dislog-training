import { Router } from "express";

import { CreateDocumentController } from "../../../../modules/documents/useCases/createDocument/CreateDocumentController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const documentsRoutes = Router();

const createDocumentController = new CreateDocumentController();

documentsRoutes.use(ensureAuthenticated);

documentsRoutes.post("/", createDocumentController.handle);

export { documentsRoutes };
