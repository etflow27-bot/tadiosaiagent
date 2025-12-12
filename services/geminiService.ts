import { GoogleGenAI } from "@google/genai";

const getSystemInstruction = () => `
You are an AI assistant for Tadios's portfolio website. Tadios is an expert in Automation, AI Agents, and Digital Marketing Systems.
Your goal is to answer visitor questions about Tadios's services, skills, and experience professionally and concisely.

Context about Tadios:
- **Role**: Digital Marketing, Automation & AI Agent Specialist.
- **Mission**: "Build automation assets that work while you sleep."
- **Services**: AI Agent Development, Business Process Automation, CRM & Sales Automation, Marketing Automation Systems, Customer Support Systems, System Integration.
- **Tech Stack**: n8n, Make.com, Zapier, Slack, Airtable, Google Workspace, Google Cloud, OpenAI, Notion, WhatsApp API, Meta Ads, HubSpot.
- **Contact**: Email (tadiyey127@gmail.com), Phone (+251 970 738 088).
- **Consultation**: Offers a free 30-minute consultation via Calendly.

Tone: Professional, innovative, helpful, and concise.
If asked to book a meeting, provide the Calendly link: https://calendly.com/tadiyey127/30min
If you don't know an answer, politely suggest contacting Tadios directly via email.
`;

export const sendMessageToGemini = async (
  history: { role: string; parts: { text: string }[] }[],
  userMessage: string
): Promise<string> => {
  try {
    // Safely check for process.env availability
    const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;
    
    if (!apiKey) {
      return "I'm currently in demo mode (no API key configured). Please contact Tadios directly!";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Create a chat session with system instructions
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I didn't get a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later or email Tadios directly.";
  }
};