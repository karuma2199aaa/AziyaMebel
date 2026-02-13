
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a professional product description using Gemini API.
 */
export const generateProductDescription = async (productName: string, language: 'ru' | 'uz') => {
  // Fixed: Use process.env.API_KEY directly as per guidelines.
  // The SDK requires { apiKey: string } configuration.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Write a professional, attractive sales description for a furniture item named "${productName}" in ${language === 'ru' ? 'Russian' : 'Uzbek'}. Keep it under 150 characters. Mention quality and comfort.`;
  
  try {
    // Fixed: Always use ai.models.generateContent with model name and prompt.
    // gemini-3-flash-preview is suitable for basic text tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Fixed: Access the .text property directly (do not call as a method).
    return response.text?.trim() || "No description generated";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Error generating description";
  }
};
