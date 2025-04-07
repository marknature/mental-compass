import { getErrorMessage } from "@/lib/utils";
import { GetMoodLogsSchema, moodLogsParams } from "@/lib/validators";
import axios from "axios";
import { createSerializer } from "nuqs/server";

export async function getMoodLogs(input: Partial<GetMoodLogsSchema>) {
  try {
    const serialize = createSerializer(moodLogsParams);
    const params = serialize(input);

    const response = await axios.get(`/api/journals${params}`);

    if (response.status !== 200) throw new Error("Failed to fetch journals");

    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}
