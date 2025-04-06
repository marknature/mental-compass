import { getErrorMessage } from "@/lib/utils";
import { eventsParams, GetEventsSchema } from "@/lib/validators";
import axios from "axios";
import { createSerializer } from "nuqs/server";

export async function getEvents(input: Partial<GetEventsSchema>) {
  try {
    const serialize = createSerializer(eventsParams);
    const params = serialize(input);

    const response = await axios.get(
      `http://localhost:3000/api/events${params}`,
    );

    if (response.status !== 200) throw new Error("Failed to fetch events");

    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}
