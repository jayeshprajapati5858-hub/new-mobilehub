
import { GoogleGenAI, Type } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a product description using Gemini 3 Flash.
 * This is a basic text task suitable for the flash model.
 */
export const generateProductDescription = async (productName: string, category: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, professional, and catchy product description for a ${category} item named "${productName}". Keep it under 200 words. Focus on premium quality and village accessibility.`,
    });
    // Use .text property directly, not as a method.
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    return "Failed to generate description.";
  }
};

/**
 * Analyzes sales data using Gemini 3 Pro for complex strategic insights.
 * Reasoning over business data is a complex task.
 */
export const analyzeSalesData = async (orders: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze these recent orders and provide 3 brief strategic insights for a small village mobile shop owner: ${JSON.stringify(orders.slice(0, 5))}`,
    });
    // Use .text property directly.
    return response.text;
  } catch (error) {
    return "AI insights currently unavailable.";
  }
};
