"use client";

import Image from "next/image";
import Link from "next/link";

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
  const placeholderThumbnail = "/placeholder-thumbnail.png"; // add this image later

  return (
    <div className='border rounded-lg overflow-hidden shadow-lg bg-card dark:border-neutral-700 transition-transform duration-200 hover:scale-[1.02]'>
      {/* Link the entire card or just the image/title */}
      <a
        href={video_url}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Watch ${title}`}
      >
        <div className='relative aspect-video'>
          {" "}
          {/* Maintain 16:9 aspect ratio */}
          <Image
            src={thumbnail_url || placeholderThumbnail}
            alt={`Thumbnail for ${title}`}
            fill // Use fill to cover the container
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            style={{ objectFit: "cover" }} // might crop
            // add placeholder/blur effect
            //placeholder='blur'
            //blurDataURL='data:...'
            // Or handle errors
            onError={(e) => {
              // If the thumbnail fails, try setting it to the placeholder
              const target = e.target as HTMLImageElement;
              if (target.src !== placeholderThumbnail) {
                target.src = placeholderThumbnail;
              }
            }}
          />
        </div>
      </a>
      <div className='p-4'>
        <h3 className='font-semibold text-lg mb-1 leading-tight text-foreground hover:text-primary'>
          <a href={video_url} target='_blank' rel='noopener noreferrer'>
            {title}
          </a>
        </h3>
        {streamer_name && ( // Only display if streamer name exists
          <p className='text-sm text-muted-foreground'>By: {streamer_name}</p>
        )}
        {/* Could add more details here later: platform, description snippet, date etc */}
      </div>
    </div>
  );
}
