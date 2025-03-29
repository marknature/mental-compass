import { db } from "..";
import { createClient } from "@/lib/supabase/server";
import events from "../schema/events.schema";

export async function getEvents() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const data = await db.select().from(events);

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
