import { Injectable } from "@nestjs/common";
import { GoogleGenAI } from "@google/genai";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor(private readonly prisma: PrismaService) {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async answerQuery(userId: string, query: string) {

    const bills = await this.prisma.bill.findMany({
      where: { userId },
      orderBy: { dueDate: "asc" },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { budget: true },
    });
    const budget = user?.budget ?? 0;

    const priorityMap = { 1: "High", 2: "Medium", 3: "Low" };
    const billText =
      bills.length > 0
        ? bills
            .map(
              (b) =>
                `- ${b.name} due on ${new Date(
                  b.dueDate
                ).toDateString()} with amount ₱${b.amount} (Priority: ${
                  priorityMap[b.priority] || "Medium"
                })`
            )
            .join("\n")
        : "No active bills found.";

    const budgetText = `The user's current budget is ₱${budget.toFixed(2)}.`;

    const prompt = `
You are DueMinder, a friendly assistant that helps users manage bills, subscriptions, and reminders.

User's Question:
${query}

Here is the user's bill data:
${billText}

${budgetText}

Answer based on the budget and bill data. Respond conversationally as DueMinder.
`;

    const response = await this.ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const parts = response.candidates?.[0]?.content?.parts;
    return parts?.map((p) => p.text).join("") ?? "⚠️ No response generated.";
  }
}
