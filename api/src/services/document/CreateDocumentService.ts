import fs from "fs"; 
// No Node significa File System (Sistema de Arquivos). 
// É um módulo nativo do Node.js que permite ler, escrever, criar, mover e apagar arquivos no disco do servidor.
import path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import { DocumentRequest } from "../../interfaces/document.type";

class CreateDocumentService {
  async execute(data: DocumentRequest) {
    try {
      // 1. Caminho do template
      const templatePath = path.resolve(
        __dirname,
        "..",
        "..",
        "templates",
        "documentTemplate.hbs"
      );
      // 2. Lê o arquivo do template
      const templateFile = fs.readFileSync(templatePath, "utf-8");
      // 3. Compila com Handlebars
      const template = Handlebars.compile(templateFile);
      // 4. Gera o HTML final com os dados + data atual
      const html = template({ ...data, date: new Date().toLocaleDateString("pt-BR") });
      //5. Salva o HTML gerado em um arquivo temporário
      const outputPath = path.resolve(__dirname, "..", "..", "test2_document.html");
      fs.writeFileSync(outputPath, html);
      console.log("📌 HTML salvo em:", outputPath);

      // 6. Inicia Puppeteer (headless)
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      // 7. Carrega o HTML
      await page.setContent(html, { waitUntil: "networkidle0" });

      // 8. Gera PDF
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
      });

      await browser.close();

      // 9. Salva o PDF localmente
      const pdfPath = path.resolve(__dirname, "..", "..", "test_document.pdf");
      fs.writeFileSync(pdfPath, pdfBuffer);
      console.log("📄 PDF salvo em:", pdfPath);

      // 10. Retorna Buffer (pode ser usado para download ou base64 para preview)
      return pdfBuffer;
    } catch (err) {
      console.error("❌ Erro no service:", err);
      throw err;
    }
  }
}

export { CreateDocumentService };
