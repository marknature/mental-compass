export async function getPodcasts() {
  const res = await fetch("/api/podcasts");
  if (!res.ok) throw new Error("Failed to fetch podcasts");
  return res.json();
}
