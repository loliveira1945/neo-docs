import { Request, Response } from "express";
import { CreateDocumentService } from '../../services/document/CreateDocumentService';
import { DocumentRequest } from "../../interfaces/document.type";

class CreateDocumentController{
  async handle(req: Request, res: Response) {
    try {
      const data: DocumentRequest = req.body;
      const createDocumentService = new CreateDocumentService();

      const html = await createDocumentService.execute(data);

      return res.type("text/html").send(html);

    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao gerar documento" });
    }
  }
}

export { CreateDocumentController }