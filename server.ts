import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to get Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY não configurada no ambiente.");
  }
  return new GoogleGenAI({ apiKey });
}

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "EDU - Criador Arrastar para Mais Informações" });
});

// API Route for AI Activity Generation
app.post("/api/ai-generate", async (req, res) => {
  try {
    const { topic, itemCount = 4, language = "pt" } = req.body;

    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ error: "Tópico inválido fornecido." });
    }

    const ai = getGeminiClient();

    const prompt = `Você é um especialista em design instrucional e criação de materiais educacionais interativos.
Gere o conteúdo para uma atividade pedagógica do tipo "Arrastar para Mais Informações".
O tema é: "${topic}".
Quantidade de itens: ${itemCount}.
Idioma: ${language === "pt" ? "Português" : "Inglês"}.

Retorne ESTRITAMENTE um JSON válido com o seguinte formato, sem texto antes ou depois e sem blocos markdown extra:
{
  "title": "Título atrativo e claro para a atividade",
  "subtitle": "Instruções curtas de como realizar a atividade (ex: Arraste os cards para o painel de revelação para descobrir mais detalhes)",
  "categoryName": "Nome do Tópico Central ou Categoria",
  "items": [
    {
      "id": "item-1",
      "title": "Nome do Conceito / Objeto 1",
      "subtitle": "Breve resumo (1 linha)",
      "badge": "Tag / Categoria curta",
      "icon": "brain | book | star | zap | target | compass | lightbulb | shield | cpu | award",
      "color": "#3b82f6",
      "details": "Explicação detalhada e didática sobre este conceito, adequada para estudantes. Pode conter 2 a 3 parágrafos breves com destaques em pontos chave."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "";
    const cleanJsonText = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    
    try {
      const data = JSON.parse(cleanJsonText);
      return res.json({ success: true, data });
    } catch (parseErr) {
      console.error("Erro ao converter JSON do Gemini:", text);
      return res.status(500).json({ error: "Falha ao processar resposta da IA. Tente novamente." });
    }
  } catch (error: any) {
    console.error("Erro na API /api/ai-generate:", error);
    return res.status(500).json({ error: error.message || "Erro interno ao gerar conteúdo." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
