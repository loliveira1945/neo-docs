"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentController = void 0;
const CreateDocumentService_1 = require("../../services/document/CreateDocumentService");
class CreateDocumentController {
    async handle(req, res) {
        try {
            const data = req.body;
            const createDocumentService = new CreateDocumentService_1.CreateDocumentService();
            const pdfBuffer = await createDocumentService.execute(data);
            return res.type("text/html").send(pdfBuffer);
            // Define o tipo de resposta como PDF
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "inline; filename=document.pdf");
            // se quiser forçar download, use: attachment; filename=document.pdf
            // No front -> window.open(`${API_URL}/document`, "_blank");
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao gerar documento" });
        }
    }
}
exports.CreateDocumentController = CreateDocumentController;
