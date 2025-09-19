// lib/services/species-chat.ts
import OpenAI from "openai";

// Ensure your .env has OPENAI_API_KEY
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API key in environment variables.");
}

// Initialize the OpenAI client outside the function
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the message type exactly as OpenAI expects
type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

// Optional: you can store conversation history in memory or database
let conversationHistory: ChatMessage[] = [];

export async function generateResponse(userMessage: string): Promise<string> {
  try {
    if (!userMessage || typeof userMessage !== "string") {
      return "Invalid input. Please provide a valid message.";
    }

    // Build messages array
    const messages: ChatMessage[] = [
      {
        role: "system",
        content:
          "You are a helpful chatbot that only answers questions about species, animals, and related biology topics. If the question is not about animals, politely inform the user you only answer animal-related topics."
      },
      // Include previous conversation if you want memory
      ...conversationHistory,
      {
        role: "user",
        content: userMessage
      }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    // Safely extract the assistant response
    const responseContent =
      completion.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response. Please try again.";

    // Update conversation history for memory
    conversationHistory.push(
      { role: "user", content: userMessage },
      { role: "assistant", content: responseContent }
    );

    return responseContent;
  } catch (err) {
    console.error("Error generating response:", err);
    return "Sorry, something went wrong while generating the response.";
  }
}
