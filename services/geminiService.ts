import { GoogleGenAI, Chat } from "@google/genai";
import { InterviewConfig } from "../types";
import { SYSTEM_INSTRUCTION_TEMPLATE } from "../constants";

let chatSession: Chat | null = null;

export const initializeInterview = async (config: InterviewConfig): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing via process.env.API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });

  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_TEMPLATE(config),
      temperature: 0.7, 
    },
  });

  // Start the conversation
  try {
    const response = await chatSession.sendMessage({ message: "Hello. I am ready for the interview." });
    return response.text || "Error: No response from AI.";
  } catch (error) {
    console.error("Failed to start interview:", error);
    throw error;
  }
};

export const sendMessageToAI = async (message: string): Promise<string> => {
  if (!chatSession) {
    throw new Error("Chat session not initialized.");
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "";
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const generateFinalReport = async (): Promise<string> => {
    if (!chatSession) {
        throw new Error("Chat session not initialized.");
    }
    // Force the AI to wrap up
    try {
        const response = await chatSession.sendMessage({ 
            message: "Please end the interview now and generate the Final Report as per your instructions." 
        });
        return response.text || "";
    } catch (error) {
        console.error("Error generating report:", error);
        throw error;
    }
}
