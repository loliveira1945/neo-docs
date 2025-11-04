"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentService = void 0;
const fs_1 = __importDefault(require("fs"));
// No Node significa File System (Sistema de Arquivos). 
// É um módulo nativo do Node.js que permite ler, escrever, criar, mover e apagar arquivos no disco do servidor.
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const extractClientSlug_1 = require("../../utils/extractClientSlug");
class CreateDocumentService {
    async execute(data) {
        try {
            // 1. Extrai o nome do cliente a partir da URL
            // Exemplo: "https://comercial.neoassist.com" -> "comercial"
            // Esse nome será usado para montar o link do manual
            const clientSlug = data.central.length > 0
                ? (0, extractClientSlug_1.extractClientSlug)(data.central[0].url)
                : null;
            const clientUrl = clientSlug;
            // 2. Caminho do template
            const templatePath = path_1.default.resolve(__dirname, "..", "..", "templates", "documentTemplate.hbs");
            // 3. Lê o arquivo do template
            const templateFile = fs_1.default.readFileSync(templatePath, "utf-8");
            // 4. Compila com Handlebars
            const template = handlebars_1.default.compile(templateFile);
            // 5. Gera o HTML final com os dados + data atual
            const html = template({
                ...data,
                clientUrl,
                date: new Date().toLocaleDateString("pt-BR")
            });
            console.log("📌 URL AQUI:", clientUrl);
            // 6. Salva o HTML gerado em um arquivo temporário
            // const outputPath = path.resolve(__dirname, "..", "..", "test2_document.html");
            // fs.writeFileSync(outputPath, html);
            // console.log("📌 HTML salvo em:", outputPath);
            // 7. Inicia Puppeteer (headless)
            const browser = await puppeteer_1.default.launch({ headless: true });
            const page = await browser.newPage();
            // 8. Carrega o HTML
            await page.setContent(html, { waitUntil: "networkidle0" });
            // 9. Gera PDF
            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
            });
            await browser.close();
            // 10. Salva o PDF localmente
            // const pdfPath = path.resolve(__dirname, "..", "..", "test_document.pdf");
            // fs.writeFileSync(pdfPath, pdfBuffer);
            // console.log("📄 PDF salvo em:", pdfPath);
            // 11. Retorna Buffer (pode ser usado para download ou base64 para preview)
            return pdfBuffer;
        }
        catch (err) {
            console.error("❌ Erro no service:", err);
            throw err;
        }
    }
}
exports.CreateDocumentService = CreateDocumentService;
