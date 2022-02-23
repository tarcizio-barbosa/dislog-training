import { Router } from "express";

import { CreateDocumentController } from "../../../../modules/documents/useCases/createDocument/CreateDocumentController";
import { CreateDocumentActivityController } from "../../../../modules/documents/useCases/createDocumentActivity/CreateDocumentActivityController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const documentsRoutes = Router();

const createDocumentController = new CreateDocumentController();
const createDocumentActivityController = new CreateDocumentActivityController();

documentsRoutes.use(ensureAuthenticated);

documentsRoutes.post("/", createDocumentController.handle);
documentsRoutes.post("/link-activity", createDocumentActivityController.handle);

export { documentsRoutes };
