"use client";

import { motion } from "framer-motion";
import PlaythroughCard from "./PlaythroughCard";

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

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function PlaythroughList({
  playthroughs,
}: PlaythroughListProps) {
  // If no playthroughs are passed (e.g., initial load or error upstream), display nothing
  if (!playthroughs || playthroughs.length === 0) {
    // should ideally be handled by the page component before rendering this list
    return null;
  }

  return (
    <motion.div
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {playthroughs.map((playthrough) => (
        <motion.div key={playthrough.id} variants={itemVariants}>
          <PlaythroughCard
            key={playthrough.id}
            id={playthrough.id}
            title={playthrough.title}
            streamer_name={playthrough.streamer_name}
            video_url={playthrough.video_url}
            thumbnail_url={playthrough.thumbnail_url}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
