"use client";

import { motion } from "framer-motion";
import PlaythroughCard from "./PlaythroughCard";

import type { Playthrough } from "@/lib/types";

interface PlaythroughListProps {
  playthroughs: Playthrough[]; // Expects an array of Playthrough objects
  gridCols?: string; // Optional prop for grid columns
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

const defaultGridCols =
  "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

export default function PlaythroughList({
  playthroughs,
  gridCols = defaultGridCols,
}: PlaythroughListProps) {
  // If no playthroughs are passed (e.g., initial load or error upstream), display nothing
  if (!playthroughs || playthroughs.length === 0) {
    // should ideally be handled by the page component before rendering this list
    return null;
  }

  return (
    <motion.div
      className={`grid ${gridCols} gap-4 md:gap-6`} // Use the prop or default
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
