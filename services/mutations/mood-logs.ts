import { getErrorMessage } from "@/lib/utils";
import axios from "axios";
import { CreateMoodLogSchema } from "../database/schema/mood/mood-logs.schema";

/**
 * Creates a new mood log or updates an existing one if id is provided
 * @param input The mood log data to create or update
 * @returns Object containing the created/updated data or error message
 */

export async function createOrUpdateMoodLog(input: CreateMoodLogSchema) {
  try {
    const response = await axios.post("/api/journals", input);

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.error || error.message
      : getErrorMessage(error);

    return {
      data: null,
      error: message,
    };
  }
}
