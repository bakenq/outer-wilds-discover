import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PostgrestError } from "@supabase/supabase-js";

import YouTubeEmbed from "@/components/YouTubeEmbed";
import { extractVideoId } from "@/lib/utils";

import type { Playthrough } from "@/lib/types";

interface PlaythroughPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 600;

export async function generateStaticParams(): Promise<{ id: string }[]> {
  console.log("Attempting to generate static params for playthroughs...");

  // NOTE: cookies() is not available during build time in generateStaticParams.
  const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabase_url || !supabase_key) {
    console.error(
      "Supabase URL or Anon Key missing in build environment for generateStaticParams."
    );
    return [];
  }

  const { createClient: createSupabaseClient } = await import(
    "@supabase/supabase-js"
  );
  const supabase = createSupabaseClient(supabase_url, supabase_key);

  const { data: playthroughs, error } = await supabase
    .from("playthroughs")
    .select("id");

  if (error || !playthroughs) {
    console.error("Error fetching IDs for generateStaticParams:", error);
    return [];
  }

  console.log(
    `Generating static pages for ${playthroughs.length} playthroughs.`
  );
  return playthroughs.map((playthrough) => ({
    id: playthrough.id,
  }));
}

export default async function PlaythroughPage({
  params,
}: PlaythroughPageProps) {
  const { id } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetch single playthrough matching the ID
  const {
    data: playthrough,
    error,
  }: { data: Playthrough | null; error: PostgrestError | null } = await supabase
    .from("playthroughs")
    .select(
      `
            id,
            title,
            streamer_name,
            video_url,
            thumbnail_url,
            description,
            created_at,
            platform
        `
    )
    .eq("id", id)
    .single<Playthrough>();

  // Handle errors or not found
  if (error || !playthrough) {
    if (error) console.error("Error fetching playthrough:", id, error);
    notFound();
  }

  // Extract YouTube Video ID for embedding
  const { videoId, platform } = extractVideoId(
    playthrough.video_url,
    playthrough.platform
  );

  return (
    <div className='container mx-auto p-4 md:p-6 lg:p-8'>
      <Button
        asChild
        variant='ghost'
        className='hidden p-2 sm:inline-flex text-primary hover:text-primary/90 hover:bg-primary/15'
      >
        <Link href='/playthroughs'>
          <ArrowLeft className='h-4 w-4' />
          Browse Playthroughs
        </Link>
      </Button>
      {/* Page Header */}
      <div className='mb-6 md:mb-8'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-balance'>
          {" "}
          {/* Slightly larger h1 */}
          {playthrough.title}
        </h1>
        {playthrough.streamer_name && (
          <p className='text-lg text-muted-foreground'>
            By: {playthrough.streamer_name}
          </p>
        )}

        <a
          href={playthrough.video_url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-xs text-muted-foreground hover:text-primary transition-colors mt-2 inline-flex items-center group'
        >
          <span>
            Watch on {platform !== "Unknown" ? platform : "Original Platform"}
          </span>
          <ArrowRight className='relative top-[0.5px] ml-1.5 h-3 w-3 transition-transform duration-200 group-hover:translate-x-1' />{" "}
          {/* Added relative top-[0.5px] */}
        </a>
      </div>

      {/* Video Embed Area */}
      <div className='aspect-video w-full max-w-4xl mx-auto bg-card rounded-lg overflow-hidden shadow-lg mb-8 md:mb-10'>
        {/* --- Conditional Embed --- */}
        {platform === "YouTube" && videoId ? (
          <YouTubeEmbed videoId={videoId} title={playthrough.title} />
        ) : (
          /* TODO: Add TwitchEmbed component here based on platform/videoId */
          // : platform === 'Twitch' && videoId ? (
          //    <TwitchEmbed videoId={videoId} />
          // )
          <div className='w-full h-full flex items-center justify-center text-muted-foreground p-4 text-center'>
            Video player could not be loaded for this source. <br /> Try
            watching on the original platform.
          </div>
        )}
        {/* ------------------------- */}
      </div>

      {/* --- Description Section with Typography --- */}
      {playthrough.description && (
        <div className='max-w-3xl mx-auto prose prose-sm dark:prose-invert prose-p:text-muted-foreground prose-headings:text-foreground'>
          <h2 className='text-xl font-semibold mb-3'>Description</h2>
          <p>{playthrough.description}</p>
        </div>
      )}
      {/* ------------------------------------------ */}
    </div>
  );
}
