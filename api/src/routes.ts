import { Router } from "express";
import { CreateDocumentController } from './controllers/document/CreateDocumentController';

const router = Router();

const createDocumentController = new CreateDocumentController();
router.post("/document", (req, res) => createDocumentController.handle(req, res));

export { router };
