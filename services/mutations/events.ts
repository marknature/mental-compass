import { getErrorMessage } from "@/lib/utils";
import axios from "axios";
import { NewEvent } from "../database/schema/events/events.schema";
import { NewUserEvent } from "../database/schema/events/users-events.shema";

export async function createEvent(input: NewEvent) {
  try {
    const response = await axios.post("/api/events", input);
    if (response.status !== 201) throw new Error("Failed to create event");
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}

export async function createUserEvent(input: NewUserEvent) {
  try {
    const response = await axios.post(`/api/events`, input).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error("Failed to create event");
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}
