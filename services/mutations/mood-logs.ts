import { getErrorMessage } from "@/lib/utils";

export async function createUsersMoodLogs() {
  try {
    const response = await fetch(`http://localhost:3000/api/journals`, {
      method: "POST",
    });
    if (!response.ok) throw Error("Failed to post journals");
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}
