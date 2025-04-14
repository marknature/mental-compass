import axios from "axios";
import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

const getToken = async () => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
};

export async function GET() {
  try {
    const token = await getToken();
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "mental health OR therapy OR wellness",
        type: "episode",
        market: "ZW",
        limit: 5,
      },
    });

    const episodes = response.data.episodes.items.map((ep: any) => ({
      id: ep.id,
      title: ep.name,
      description: ep.description,
      duration: `${Math.round(ep.duration_ms / 60000)} min`,
      publishedDate: new Date(ep.release_date).toDateString(),
      categories: ["mental health"], // Spotify doesn’t return categories directly for episodes
      image: ep.images[0]?.url || "/api/placeholder/400/400",
      spotifyUrl: ep.external_urls.spotify,
    }));

    return NextResponse.json(episodes);
  } catch (error) {
    console.error("Error fetching episodes from Spotify:", error);
    return NextResponse.json(
      { error: "Failed to fetch episodes" },
      { status: 500 },
    );
  }
}
