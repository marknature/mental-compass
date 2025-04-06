import { getErrorMessage } from "@/lib/utils";
import { GetInsightsSchema, insightsParams } from "@/lib/validators";
import axios from "axios";
import { createSerializer } from "nuqs/server";

// Get all insights for a user
export async function getInsights(input: Partial<GetInsightsSchema>) {
  try {
    const serialize = createSerializer(insightsParams);
    const params = serialize(input);

    const response = await axios.get(
      `http://localhost:3000/api/insights${params}`,
    );

    if (response.status !== 200) throw new Error("Failed to fetch insights");

    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}
