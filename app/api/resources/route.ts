import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/database";
import events from "@/services/database/schema/events/events.schema";
import { eq, ilike, or } from "drizzle-orm";
import articles from "@/services/database/schema/articles.schema";

export async function POST(request: NextRequest) {
  try {
    const { keywords } = await request.json();

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { error: "Keywords array is required" },
        { status: 400 },
      );
    }

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

    return NextResponse.json({
      events: relevantEvents,
      articles: relevantArticles,
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 },
    );
  }
}
