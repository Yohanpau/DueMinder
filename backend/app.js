import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import pdf from "pdf-parse";
import { v4 as uuidv4 } from "uuid";
import { GoogleGenAI } from "@google/genai";
import cosineSimilarity from "cosine-similarity";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const vectorStore = [];

// PDF embedding functions
async function embedText(text) {
  const result = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });
  return result.embeddings.values;
}

function splitText(text, chunkSize, overlap) {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  const chunks = [];
  let chunk = "";

  for (let i = 0; i < sentences.length; i++) {
    if ((chunk + sentences[i]).length > chunkSize) {
      chunks.push(chunk.trim());
      i -= Math.floor(overlap / 100);
      chunk = "";
    } else {
      chunk += sentences[i];
    }
  }
  if (chunk) chunks.push(chunk.trim());
  return chunks;
}

async function loadPDFChunks(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const { text } = await pdf(dataBuffer);
  const chunks = splitText(text.slice(0, 4000), 200, 50);
  for (const chunk of chunks) {
    const embedding = await embedText(chunk);
    vectorStore.push({ id: uuidv4(), text: chunk, embedding });
  }
}

function retrieveRelevantChunks(queryEmbedding, topK = 5) {
  return vectorStore
    .map((doc) => ({
      ...doc,
      score: cosineSimilarity(doc.embedding, queryEmbedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

async function answerQuery(query) {
  const queryEmbedding = await embedText(query);
  const relevantChunks = retrieveRelevantChunks(queryEmbedding);
  const knowledge = relevantChunks.map((c) => c.text).join("\n\n");

  const prompt = `
You are DueMinder, a helpful assistant designed to help users with anything related to their bills, payments, subscriptions, and reminders. Answer clearly and conversationally based on what you know.

User's question: ${query}

Relevant information:
${knowledge}
`;

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
  });

  const parts = response.candidates?.[0]?.content?.parts;
  return parts?.map((p) => p.text).join("") ?? "⚠️ No response generated.";
}

app.post("/api/chat", async (req, res) => {
  const { query, bills, budget } = req.body; 

  try {
    const billText = bills
      .map((b) => `- ${b.name} due on ${b.dueDate} with amount ₱${b.amount}`)
      .join("\n");

    const budgetValue = parseFloat(budget || 0).toFixed(2);
    const budgetText = `The user's current budget is ₱${budgetValue}.`;

    const queryEmbedding = await embedText(query);
    const relevantChunks = retrieveRelevantChunks(queryEmbedding);
    const knowledge = relevantChunks.map((c) => c.text).join("\n\n");

    const prompt = `
You are DueMinder, a helpful assistant that assists users in managing bills, subscriptions, and reminders.

User’s Question:
${query}

Here is the user's bill data:
${billText}

${budgetText}

Additional relevant information:
${knowledge}

Answer based on the budget and bill data. Respond conversationally.
`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    const parts = response.candidates?.[0]?.content?.parts;
    const answer =
      parts?.map((p) => p.text).join("") ?? "⚠️ No response generated.";

    res.json({ reply: answer });
  } catch (err) {
    console.error("Error answering query:", err);
    res.status(500).json({ reply: "❌ Failed to generate a response." });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await loadPDFChunks("./Dueminder.pdf");
});
