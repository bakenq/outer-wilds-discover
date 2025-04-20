"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className='relative flex min-h-[calc(100vh-var(--header-height,4rem))] flex-col items-center justify-center overflow-hidden px-4 text-center'>
      <div className='absolute inset-0 -z-10'>
        {/* Star Field */}
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--foreground)/0.2) 1px, transparent 2px)`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Blurred Planets */}
        {/* Planet 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          //animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='absolute left-[15%] top-[20%] w-64 h-64 bg-gradient-to-br from-secondary/50 via-transparent to-transparent rounded-full blur-sm'
          // slow pulse or movement animation
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.02, 1],
            transition: { repeat: Infinity, duration: 5 },
          }}
        />
        {/* Planet 2 */}
        {/* Planet 2 (Primary Color - Orange) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          //animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className='absolute right-[15%] bottom-[25%] w-80 h-80 bg-gradient-to-tl from-primary/30 via-transparent to-transparent rounded-full blur-sm'
          // slow pulse or movement animation
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.02, 1],
            transition: { repeat: Infinity, duration: 5 },
          }}
        />
      </div>

      {/* Foreground Content Wrapper (z-10) */}
      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          // Optional: Stagger children entrance
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2, // Time between each child animating in
            },
          },
        }}
        className='relative z-10 max-w-3xl' // Increased max-width slightly
      >
        {/* Animated Heading */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className='text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl text-balance mb-6'
        >
          Discover New <span className='text-primary'>Outer Wilds</span>{" "}
          Adventures
        </motion.h1>

        {/* Animated Subheading */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className='text-lg text-muted-foreground md:text-xl text-balance mb-10'
        >
          Find your next favorite playthrough and experience the wonder of Outer
          Wilds through someone else's eyes.
        </motion.p>

        {/* Animated Button Group */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className='flex flex-col sm:flex-row gap-4 justify-center'
        >
          <Button asChild size='lg' className='text-base'>
            <Link href='/playthroughs'>Discover Playthroughs</Link>
          </Button>
          {/* Optional Secondary Button - Add later if needed
           <Button asChild size="lg" variant="outline" className="text-base">
             <Link href="/about">About The Project</Link>
           </Button>
           */}
        </motion.div>
      </motion.div>
    </section>
  );
}
