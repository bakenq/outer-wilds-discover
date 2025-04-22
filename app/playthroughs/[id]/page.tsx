import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PostgrestError } from "@supabase/supabase-js";

import type { Playthrough } from "@/lib/types";

interface PlaythroughPageProps {
  params: {
    id: string;
  };
}

// Helper function to extract YouTube Video ID
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    if (
      urlObj.hostname === "www.youtube.com" ||
      urlObj.hostname === "youtube.com"
    ) {
      return urlObj.searchParams.get("v");
    }
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.substring(1);
    }
  } catch (error) {
    console.error("Error parsing video URL:", error);
    return null;
  }
  return null;
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
    .single();

  // Handle errors or not found
  if (error) {
    console.error(`Error fetching playthrough ${id}:`, error);
    notFound();
  }

  if (!playthrough) {
    console.log(`Playthrough with ID ${id} not found.`);
    notFound();
  }

  // Extract YouTube Video ID for embedding
  const videoId = getYouTubeVideoId(playthrough.video_url);

  return (
    <div className='container mx-auto p-4 md:p-6 lg:p-8'>
      {/* Back link */}
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

      {/* Playthrough Title */}
      <h1 className='text-2xl md:text-3xl font-bold mb-2'>
        {playthrough.title}
      </h1>

      {/* Streamer Info */}
      {playthrough.streamer_name && (
        <p className='text-md text-muted-foreground mb-6'>
          By: {playthrough.streamer_name}
        </p>
      )}

      {/* Video Embed Area */}
      <div className='aspect-video w-full max-w-4xl mx-auto mb-6 bg-card rounded overflow-hidden shadow-lg'>
        {videoId ? (
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${videoId}`}
            title={playthrough.title || "YouTube video player"}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        ) : (
          <div className='w-full h-full flex items-center justify-center text-muted-foreground bg-card'>
            Invalid YouTube URL or Video ID not found. Cannot embed video.
            <br />
            <a
              href={playthrough.video_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline ml-2'
            >
              Watch on source site
            </a>
          </div>
        )}
      </div>

      {/* Link to original video */}
      <div className='text-center mb-6'>
        <Button
          asChild
          variant='ghost'
          className='hidden sm:inline-flex text-primary hover:text-primary/90 hover:bg-primary/15'
        >
          <Link
            href={playthrough.video_url}
            target='_blank'
            rel='noopener noreferrer'
          >
            Watch original on {playthrough.platform || "Source"}
            <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </Button>
      </div>

      {/* Description (if available) */}
      {playthrough.description && (
        <div className='prose prose-invert dark:prose-invert max-w-none bg-card p-4 rounded shadow'>
          <h3 className='text-lg font-semibold mb-2 text-foreground'>
            Description
          </h3>
          <p className='text-sm text-muted-foreground'>
            {playthrough.description}
          </p>
        </div>
      )}

      {/* TODO: Add comments section later? */}
      {/* TODO: Add related videos section later? */}
    </div>
  );
}
