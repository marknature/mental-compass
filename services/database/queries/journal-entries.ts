import { and, eq } from "drizzle-orm";
import { db } from "..";
import journalEntries from "../schema/journal-entries.schema";
import { createClient } from "@/lib/supabase/server";

export async function getJournalEntries() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const where = and(eq(journalEntries.userId, user?.id));
    const entries = await db.select().from(journalEntries).where(where);

    return { data: entries, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
