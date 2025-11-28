import { GoogleGenAI, Chat } from "@google/genai";

// Use the provided API key from the environment
const apiKey = process.env.API_KEY || ''; 

// Helper to initialize the AI client safely
const getAIClient = () => {
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const createShoppingChat = (): Chat | null => {
  const ai = getAIClient();
  if (!ai) return null;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are "Gennie", a friendly and knowledgeable AI shopping assistant for DesiCart, a popular Indian e-commerce platform.
      
      Your goal is to help users find products, compare items, and provide shopping advice tailored to the Indian market.
      
      Key traits:
      - Polite, enthusiastic, and concise.
      - Use Indian English nuances (e.g., "lakhs", "crores" if high value, "value for money").
      - If asked about products, assume we have general categories like Electronics, Mobiles, Fashion (Ethnic & Western), Home Decor, and Grocery.
      - Suggest popular Indian brands or items if the user is vague.
      - If the user asks for a price, estimate reasonably in INR (₹).
      
      Keep responses under 150 words unless asked for a detailed comparison.`,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text || "I'm having trouble understanding that right now. Can you try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm experiencing a temporary connection issue. Please try again later.";
  }
};
