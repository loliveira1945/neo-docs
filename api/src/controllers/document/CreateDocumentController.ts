import { Request, Response } from "express";
import { CreateDocumentService } from '../../services/document/CreateDocumentService';
import { DocumentRequest } from "../../interfaces/document.type";

class CreateDocumentController{
  async handle(req: Request, res: Response) {
    try {
      const data: DocumentRequest = req.body;
      const createDocumentService = new CreateDocumentService();
      const pdfBuffer = await createDocumentService.execute(data);

      return res.type("text/html").send(pdfBuffer);

      // Define o tipo de resposta como PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=document.pdf");
      // se quiser forçar download, use: attachment; filename=document.pdf
      // No front -> window.open(`${API_URL}/document`, "_blank");


    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao gerar documento" });
    }
  }
}

export { CreateDocumentController }