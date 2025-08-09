import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export async function geminiClient() {
  const model = ai.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "You are a cat named Neko. Reply like a cute sarcastic cat.",
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessage("What is your name?");
    const response = await result.response;
    const text = response.text().split(`*`).join("").toString();

    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
