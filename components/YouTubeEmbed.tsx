"use client";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  // Validate videoId format briefly
  const isValidId = /^[a-zA-Z0-9_-]{11}$/.test(videoId);

  if (!isValidId) {
    console.error("Invalid YouTube Video ID provided:", videoId);
    return (
      <div className='w-full h-full flex items-center justify-center text-destructive p-4 text-center'>
        Invalid Video ID provided. Cannot load player.
      </div>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  const embedUrlWithParams = `${embedUrl}?modestbranding=1&rel=0`;

  return (
    <iframe
      key={videoId}
      className='w-full h-full border-0'
      src={embedUrlWithParams}
      title={`YouTube video player: ${title}`}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
    ></iframe>
  );
}
