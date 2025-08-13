import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai'; // Example using Gemini
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AiService {
  private ai;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async generateResponse(message: string) {
    const model = this.ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(message);
    return response.response.text();
  }
}
