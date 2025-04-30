export const dynamic = "force-dynamic";
import { getErrorMessage } from "@/lib/utils";
import { db } from "@/services/database";
import users from "@/services/database/schema/users.schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = (await params).id;
  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const profile = await db.select().from(users).where(eq(users.id, userId));
  if (profile.length === 0) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(profile[0]);
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.id) {
      return Response.json(
        { error: "User ID is required in the request body" },
        { status: 400 },
      );
    }

    const updateData: Partial<typeof users.$inferInsert> = {}; // Use Partial for better type safety

    if (data.first_name !== undefined) updateData.first_name = data.first_name;
    if (data.last_name !== undefined) updateData.last_name = data.last_name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.level !== undefined) updateData.level = data.level;
    if (data.streak !== undefined) updateData.streak = data.streak;
    if (data.total_points !== undefined)
      updateData.total_points = data.total_points;

    updateData.updated_at = new Date();

    const result = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, data.id))
      .returning();

    if (result.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(result[0], { status: 200 });
  } catch (error) {
    return Response.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
