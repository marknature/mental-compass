import axios from "axios";

// Get all insights for a user
export async function getQoute() {
  const options = {
    method: "GET",
    url: "https://mood-based-quote-api.p.rapidapi.com/happiness",
    headers: {
      "x-rapidapi-key": `${process.env.NEXT_PUBLIC_QUOTES_API_KEY}`,
      "x-rapidapi-host": "mood-based-quote-api.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}
