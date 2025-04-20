"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PlaythroughCardProps {
  id: string;
  title: string;
  streamer_name: string | null;
  video_url: string;
  thumbnail_url: string | null;
  // Add other fields if needed later (e.g., description, platform)
}

export default function PlaythroughCard({
  id,
  title,
  streamer_name,
  video_url,
  thumbnail_url,
}: PlaythroughCardProps) {
  // Basic placeholder image if no thumbnail is provided
  const placeholderThumbnail = "/placeholder-thumbnail.png";

  return (
    <Card
      className='overflow-hidden transition-all duration-200 ease-in-out hover:shadow-primary/20 hover:shadow-lg hover:scale-[1.05] flex flex-col h-full backface-hidden'
      style={{ willChange: "transform" }}
    >
      {/* Link wrapping image container */}
      <a
        href={video_url}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Watch ${title}`}
        className='block'
      >
        <CardHeader className='p-0'>
          <div className='relative aspect-video'>
            {/* Force 16:9*/}
            <Image
              src={thumbnail_url || placeholderThumbnail}
              alt={`Thumbnail for ${title}`}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover'
              onError={(e) => {
                // If the thumbnail fails, try setting it to the placeholder
                const target = e.target as HTMLImageElement;
                if (target.src !== placeholderThumbnail) {
                  target.src = placeholderThumbnail;
                }
              }}
            />
          </div>
        </CardHeader>
      </a>
      {/* flex-grow ensures content pushes footer down */}
      <CardContent className='p-4 flex-grow'>
        {/* Link wrapping title */}
        <a
          href={video_url}
          target='_blank'
          rel='noopener noreferrer'
          className='block'
        >
          <CardTitle className='text-base font-semibold leading-tight hover:text-primary transition-colors line-clamp-2 min-h-10'>
            {title}
          </CardTitle>
        </a>
      </CardContent>
      {streamer_name && ( // Only display if streamer name exists
        <CardFooter className='p-4 pt-0 min-h-5'>
          <p className='text-sm text-muted-foreground'>By: {streamer_name}</p>
        </CardFooter>
      )}
      {/* Could add more details here later: platform, description snippet, date etc */}
    </Card>
  );
}
