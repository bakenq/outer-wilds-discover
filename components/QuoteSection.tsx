"use client";

import { motion } from "framer-motion";
import { FlameKindling } from "lucide-react";

import BackgroundStars from "./BackgroundStars";

export default function QuoteSection() {
  const quote =
    "It's tempting to linger in this moment, while every possibility still exists. But unless they are collapsed by an observer, they will never be more than possibilities.";
  const attribution = "Solanum, Outer Wilds";

  return (
    <section className='relative overflow-hidden py-16 md:py-20 lg:py-24 text-center'>
      <BackgroundStars id='quote-particles' />

      <motion.div
        className='container mx-auto px-4'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <FlameKindling
          className='h-20 w-20 text-primary mx-auto mb-6 animate-pulse-glow'
          strokeWidth={1.5}
        />

        {/* Quote */}
        <blockquote className='max-w-2xl mx-auto mb-4'>
          <p className='text-xl md:text-2xl italic leading-relaxed text-foreground/90 text-balance'>
            “{quote}”
          </p>
        </blockquote>

        <cite className='text-sm text-muted-foreground not-italic'>
          — {attribution}
        </cite>
      </motion.div>
    </section>
  );
}
