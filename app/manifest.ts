import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Compass Campus",
    short_name: "CC",
    description: "Mental health system for university students. ",
    start_url: "/",
    display: "standalone",
    background_color: "#171c1a",
    theme_color: "#1f7551",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
