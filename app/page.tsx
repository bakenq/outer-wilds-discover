import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import WhyWatchSection from "@/components/WhyWatchSection";
import QuoteSection from "@/components/QuoteSection";

import type { Playthrough } from "@/lib/types";

export const revalidate = 600;

export default async function Home() {
  // --- Fetch Featured Playthroughs ---
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: featuredPlaythroughs, error } = await supabase
    .from("playthroughs")
    .select(
      `
        id,
        title,
        streamer_name,
        video_url,
        thumbnail_url
    `
    )
    .eq("is_featured", true) // Only get featured playthroughs
    .order("created_at", { ascending: false }) // Get newest first
    .limit(3); // Limit to only 3 features

  if (error) {
    console.error("Error fetching featured playthroughs:", error);
    // Decide how to handle error - maybe don't render the section?
    // For now, we'll pass an empty array or null
  }

  return (
    <>
      <HeroSection />

      {featuredPlaythroughs && featuredPlaythroughs.length > 0 && (
        <FeaturedSection playthroughs={featuredPlaythroughs as Playthrough[]} />
      )}

      <WhyWatchSection />
      <QuoteSection />
    </>
  );
}
