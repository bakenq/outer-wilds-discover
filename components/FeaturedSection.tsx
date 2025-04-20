"use client";

import PlaythroughList from "./PlaythroughList";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface Playthrough {
  id: string;
  title: string;
  streamer_name: string | null;
  video_url: string;
  thumbnail_url: string | null;
}
interface FeaturedSectionProps {
  playthroughs: Playthrough[];
}

export default function FeaturedSection({
  playthroughs,
}: FeaturedSectionProps) {
  // Don't render if no playthroughs passed (already checked in page.tsx)
  if (!playthroughs || playthroughs.length === 0) {
    return null;
  }

  return (
    <section className='py-12 md:py-16 lg:py-20 bg-background'>
      {" "}
      {/* Use theme background */}
      <motion.div
        className='container mx-auto px-4'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }} // Only animate once when in view (20%)
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {/* Section Header */}
        <div className='mb-8 md:mb-10 flex justify-between items-center'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-2'>
              Featured Playthroughs
            </h2>
            <p className='text-muted-foreground max-w-3xl'>
              Handpicked adventures that capture the wonder, curiosity, and
              emotional depth of Outer Wilds.
            </p>
          </div>
          {/* See All Link */}
          <Button
            asChild
            variant='ghost'
            className='hidden sm:inline-flex text-primary hover:text-primary/90 hover:bg-primary/15'
          >
            <Link href='/playthroughs'>
              See all playthroughs
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>

        {/* Re-use PlaythroughList - it handles the grid */}
        <PlaythroughList
          playthroughs={playthroughs}
          gridCols='grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        />

        {/* See All Link (Visible on Small Screens) */}
        <div className='mt-8 text-center sm:hidden'>
          <Button
            asChild
            variant='outline'
            className='text-primary border-primary hover:bg-primary/20 hover:text-primary'
          >
            <Link href='/playthroughs'>
              See all playthroughs
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
