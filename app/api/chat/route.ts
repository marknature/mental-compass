// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import type { ChatResponse } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "@/lib/chatbot-service";
import { db } from "@/services/database";
import events from "@/services/database/schema/events/events.schema";
import { eq, ilike, or } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import articles from "@/services/database/schema/articles.schema";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store conversation history in memory (in production, use a database)
const sessions: Record<
  string,
  Array<{ role: "system" | "user" | "assistant"; content: string }>
> = {};

// Extract keywords from user message
function extractKeywords(message: string): string[] {
  // Basic keyword extraction - in production, use NLP or a more sophisticated approach
  const mentalHealthKeywords = [
    "anxiety",
    "stress",
    "depression",
    "mindfulness",
    "meditation",
    "sleep",
    "insomnia",
    "worry",
    "panic",
    "trauma",
    "therapy",
    "counseling",
    "lonely",
    "loneliness",
    "sadness",
    "grief",
    "relaxation",
    "breathing",
    "exercise",
    "yoga",
    "wellness",
    "mental health",
    "self-care",
    "burnout",
    "overwhelmed",
  ];

  return mentalHealthKeywords.filter((keyword) =>
    message.toLowerCase().includes(keyword.toLowerCase()),
  );
}

// Fetch relevant resources based on keywords
async function fetchRelevantResources(keywords: string[]) {
  try {
    // Prepare search conditions for both events and articles
    const searchConditions = keywords.map((keyword) =>
      or(
        ilike(events.title, `%${keyword}%`),
        ilike(events.description || "", `%${keyword}%`),
      ),
    );

    const articleSearchConditions = keywords.map((keyword) =>
      or(
        ilike(articles.title, `%${keyword}%`),
        ilike(articles.summary, `%${keyword}%`),
        ilike(articles.category, `%${keyword}%`),
      ),
    );

    // Fetch relevant events (limit to 3)
    const relevantEvents = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
        dateTime: events.created_at,
        status: events.status,
      })
      .from(events)
      .where(or(...searchConditions))
      .limit(3);

    // Fetch relevant articles (limit to 3)
    const relevantArticles = await db
      .select({
        id: articles.id,
        title: articles.title,
        summary: articles.summary,
        category: articles.category,
        read_time: articles.read_time,
      })
      .from(articles)
      .where(or(...articleSearchConditions))
      .limit(3);

    return {
      events: relevantEvents,
      articles: relevantArticles,
    };
  } catch (error) {
    console.error("Error fetching resources:", error);
    return { events: [], articles: [] };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get authentication status
    const supabase = await createClient();
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    // Get request body
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

    // Extract keywords from user message
    const keywords = extractKeywords(message);

    let resourceContext = "";

    // Only fetch resources if we have keywords
    if (keywords.length > 0) {
      // Fetch relevant resources directly using our database service
      const resources = await fetchRelevantResources(keywords);

      // Add resources context to the system if we found relevant items
      if (resources.events.length > 0 || resources.articles.length > 0) {
        resourceContext =
          "Here are some resources that might be relevant to suggest:\n";

        if (resources.events.length > 0) {
          resourceContext += "\nEvents:\n";
          resources.events.forEach((event) => {
            resourceContext += `- "${event.title}": ${event.description || "No description available"} (ID: ${event.id})\n`;
          });
        }

        if (resources.articles.length > 0) {
          resourceContext += "\nArticles:\n";
          resources.articles.forEach((article) => {
            resourceContext += `- "${article.title}": ${article.summary} (Category: ${article.category}, Read time: ${article.read_time} min, ID: ${article.id})\n`;
          });
        }

        resourceContext += `
If you recommend a resource (article or event), always include it at the end of your message in this structured JSON format, inside triple backticks:

\`\`\`json
{
  "type": "article",
  "title": "Coping with Exam Stress",
  "reason": "managing stress",
  "id": "3505bca0-274d-4d7d-acb7-3a42b6e11c77"
}
\`\`\`

⚠️ Do not change the keys, structure, or format. Do not include any explanation outside the JSON block.`;
        // Add resource context as system message for this request only
        sessions[sid].push({
          role: "system",
          content: resourceContext,
        });
      }
    }

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
      max_tokens: 400,
    });

    // Extract the assistant's response
    const responseText =
      completion.choices[0].message.content ||
      "I'm sorry, I'm having trouble responding right now.";

    // Remove the resource context from session history
    if (resourceContext) {
      sessions[sid] = sessions[sid].filter(
        (msg) => msg.content !== resourceContext,
      );
    }

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
