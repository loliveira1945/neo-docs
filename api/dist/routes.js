"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateDocumentController_1 = require("./controllers/document/CreateDocumentController");
const router = (0, express_1.Router)();
exports.router = router;
const createDocumentController = new CreateDocumentController_1.CreateDocumentController();
router.post("/document", (req, res) => createDocumentController.handle(req, res));
