// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import type { ChatResponse } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "@/lib/chatbot-service";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store conversation history in memory (in production, use a database)
const sessions: Record<
  string,
  Array<{ role: "system" | "user" | "assistant"; content: string }>
> = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    // Create or retrieve session
    const sid = sessionId || uuidv4();
    if (!sessions[sid]) {
      sessions[sid] = [{ role: "system", content: SYSTEM_PROMPT }];
    }

    // Add user message to conversation history
    sessions[sid].push({ role: "user", content: message });

    // Keep conversation history at a reasonable size
    if (sessions[sid].length > 20) {
      sessions[sid] = [
        sessions[sid][0], // Keep system prompt
        ...sessions[sid].slice(-18), // Keep last 9 exchanges
      ];
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or use "gpt-3.5-turbo" for lower cost
      messages: sessions[sid],
      temperature: 0.7,
      max_tokens: 50,
    });

    // Extract the assistant's response
    const responseText =
      completion.choices[0].message.content ||
      "I'm sorry, I'm having trouble responding right now.";

    // Add assistant response to conversation history
    sessions[sid].push({ role: "assistant", content: responseText });

    // Generate suggestions
    const suggestionsPrompt = {
      role: "user" as const,
      content:
        "Based on our conversation, provide 3 brief follow-up questions or topics the user might want to explore, formatted as an array of strings. Keep each suggestion under 8 words and make them natural conversation starters. Format as JSON array only.",
    };

    // Get suggestions from OpenAI
    const suggestionsResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [...sessions[sid], suggestionsPrompt],
      temperature: 0.7,
      max_tokens: 150,
      response_format: { type: "json_object" },
    });

    // Parse suggestions
    let suggestions = [
      "How are you feeling now?",
      "Tell me more about your day",
      "What helps you relax?",
    ];
    try {
      const suggestionsContent =
        suggestionsResponse.choices[0].message.content || "";
      const parsedSuggestions = JSON.parse(suggestionsContent);
      if (Array.isArray(parsedSuggestions.suggestions)) {
        suggestions = parsedSuggestions.suggestions.slice(0, 3);
      }
    } catch (error) {
      console.error("Error parsing suggestions:", error);
    }

    // Return response with session ID for continuity
    const response: ChatResponse & { sessionId: string } = {
      message: {
        id: uuidv4(),
        content: responseText,
        role: "assistant",
        timestamp: new Date(),
      },
      suggestions,
      sessionId: sid,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json(
      {
        message: {
          id: uuidv4(),
          content:
            "I'm having trouble connecting right now. Could we try again in a moment?",
          role: "assistant",
          timestamp: new Date(),
        },
        suggestions: [
          "How are you feeling today?",
          "Let's try again",
          "Tell me about your day",
        ],
      },
      { status: 500 },
    );
  }
}
