import PlaythroughCard from "./PlaythroughCard"; // Import the card component

interface Playthrough {
  id: string;
  title: string;
  streamer_name: string | null;
  video_url: string;
  thumbnail_url: string | null;
}

interface PlaythroughListProps {
  playthroughs: Playthrough[]; // Expects an array of Playthrough objects
}

export default function PlaythroughList({
  playthroughs,
}: PlaythroughListProps) {
  // If no playthroughs are passed (e.g., initial load or error upstream), display nothing
  if (!playthroughs || playthroughs.length === 0) {
    // This case should ideally be handled by the page component before rendering this list
    return null;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
      {playthroughs.map((playthrough) => (
        <PlaythroughCard
          key={playthrough.id}
          id={playthrough.id}
          title={playthrough.title}
          streamer_name={playthrough.streamer_name}
          video_url={playthrough.video_url}
          thumbnail_url={playthrough.thumbnail_url}
        />
      ))}
    </div>
  );
}
