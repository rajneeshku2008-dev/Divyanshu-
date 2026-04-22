/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { CreditCard, QuizData } from "../types";

let ai: any = null;

function getAI() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. AI features will be disabled.");
      return null;
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export async function generateMatchReason(card: CreditCard, quizData: QuizData): Promise<string> {
  try {
    const model = getAI();
    if (!model) {
      return "This card offers market-leading benefits that perfectly complement your spending patterns and credit profile.";
    }

    const response = await model.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a financial advisor. Explain in one or two short, punchy sentences why the "${card.name}" is the best credit card for someone with the following profile:
      - Credit Score: ${quizData.creditScore}
      - Annual Income: ${quizData.income}
      - Primary Spending Preference: ${quizData.spending}
      - Annual Fee Preference: ${quizData.annualFee}
      
      Focus on a specific benefit that matches their spending preference. Be helpful and professional.`,
    });
    
    return response.text || "This card offers premium rewards tailored to your spending habits and financial profile.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "This card offers market-leading benefits that perfectly complement your spending patterns and credit profile.";
  }
}
