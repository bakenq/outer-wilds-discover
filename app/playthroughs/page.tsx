import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

import PlaythroughList from "@/components/PlaythroughList";

import type { Playthrough } from "@/lib/types";

export const revalidate = 600;

// Server Component
export default async function PlaythroughsPage() {
  // Get the cookie store from the incoming request
  const cookieStore = cookies();
  // Create a Supabase client configured for server-side rendering
  const supabase = createClient(cookieStore);

  // Fetch data from the 'playthroughs' table
  console.log("Fetching playthroughs from Supabase...");
  const { data: playthroughs, error } = await supabase
    .from("playthroughs")
    .select(
      `
      id,
      title,
      streamer_name,
      video_url,
      thumbnail_url,
      created_at
    `
    ) // Select only the columns needed initially
    .order("created_at", { ascending: false }); // Show newest first

  // Handle potential errors during fetching
  if (error) {
    console.error("Error fetching playthroughs:", error);
    return (
      <div className='container mx-auto p-4 md:p-6 lg:p-8'>
        <h1 className='text-2xl font-bold mb-4 text-destructive'>Error</h1>
        <p className='text-destructive-foreground'>
          Error loading playthroughs. Please check the server logs or try again
          later.
        </p>
      </div>
    );
  }

  // Handle the case where no playthroughs are found
  if (!playthroughs || playthroughs.length === 0) {
    console.log("No playthroughs found in the database.");
    return (
      <div className='container mx-auto p-4 md:p-6 lg:p-8'>
        <h1 className='text-2xl font-bold mb-4'>Outer Wilds Playthroughs</h1>
        <p className='text-muted-foreground'>
          No playthroughs have been added yet. Check back soon!
        </p>
      </div>
    );
  }

  // If data is fetched successfully, render list of playthroughs
  console.log("Successfully fetched playthroughs:", playthroughs.length);
  return (
    <div className='container mx-auto p-4 md:p-6 lg:p-8'>
      <h1 className='text-3xl font-bold mb-6 md:mb-8'>
        Outer Wilds Playthroughs
      </h1>
      <PlaythroughList playthroughs={playthroughs as Playthrough[]} />
    </div>
  );
}

// Optional: Server-side caching strategy. Revalidate fetches data at most once every 60 seconds.
// Good for data that doesn't change constantly but should eventually update without a full redeploy.
// export const revalidate = 60;
