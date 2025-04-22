import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractVideoId(
  url: string,
  platform?: string | null
): { videoId: string | null; platform: "YouTube" | "Twitch" | "Unknown" } {
  try {
    // Ensure URL constructor gets a valid URL string
    if (!url || typeof url !== "string") {
      throw new Error("Invalid URL provided");
    }
    const parsedUrl = new URL(url);

    // YouTube Logic
    if (
      platform === "YouTube" ||
      parsedUrl.hostname.includes("youtube.com") ||
      parsedUrl.hostname === "youtu.be"
    ) {
      let id: string | null = null;
      if (parsedUrl.hostname === "youtu.be") {
        id = parsedUrl.pathname.substring(1); // Get path after slash
      } else {
        id = parsedUrl.searchParams.get("v"); // Get 'v' query parameter
      }
      return { videoId: id && id.length > 5 ? id : null, platform: "YouTube" };
    }

    // Twitch Logic
    if (platform === "Twitch" || parsedUrl.hostname.includes("twitch.tv")) {
      const pathParts = parsedUrl.pathname.split("/");
      // Twitch VOD URLs look like /videos/VIDEO_ID
      if (pathParts[1] === "videos" && pathParts[2]) {
        return {
          videoId: pathParts[2].length > 5 ? pathParts[2] : null,
          platform: "Twitch",
        };
      }
    }
  } catch (e) {
    console.error("Could not parse video URL:", url, e);
  }

  return { videoId: null, platform: "Unknown" };
}
