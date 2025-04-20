import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import PlaythroughList from "@/components/PlaythroughList";

// Optional: Define a type for better type safety later when building components
// Might use later
type Playthrough = {
  id: string;
  title: string;
  streamer_name: string | null;
  video_url: string;
  thumbnail_url: string | null;
  created_at: string;
};

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
      <div className='text-red-500'>
        <h1 className='text-2xl font-bold mb-4'>Error</h1>
        <p>
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
      <div>
        <h1 className='text-2xl font-bold mb-4'>Outer Wilds Playthroughs</h1>
        <p>No playthroughs have been added yet. Check back soon!</p>
      </div>
    );
  }

  // If data is fetched successfully, render list of playthroughs
  console.log("Successfully fetched playthroughs:", playthroughs.length);
  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>Outer Wilds Playthroughs</h1>
      <PlaythroughList playthroughs={playthroughs as Playthrough[]} />
    </>
  );
}

// Optional: Server-side caching strategy. Revalidate fetches data at most once every 60 seconds.
// Good for data that doesn't change constantly but should eventually update without a full redeploy.
// export const revalidate = 60;
