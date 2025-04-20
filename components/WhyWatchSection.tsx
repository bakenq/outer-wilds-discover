"use client";

import { Eye, Users, MessageSquareHeart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: Eye,
    title: "Rediscover The Wonder",
    description:
      "Watching someone else encounter the mysteries of Outer Wilds for the first time lets you relive that initial sense of wonder and discovery.",
  },
  {
    icon: Users,
    title: "Different Perspectives",
    description:
      "Each player approaches puzzles differently and notices unique details. You might discover things you missed in your own playthrough.",
  },
  {
    icon: MessageSquareHeart,
    title: "Emotional Connection",
    description:
      "Share in the emotional journey as someone else experiences the game's profound moments for the first time.",
  },
];

export default function WhyWatchSection() {
  return (
    <section className='py-12 md:py-16 lg:py-20 bg-background'>
      <motion.div
        className='container mx-auto px-4'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.15, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        {/* Section Header */}
        <div className='text-center mb-8 md:mb-10 lg:mb-12'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-3'>
            Why Watch Others Play?
          </h2>
          <p className='text-muted-foreground max-w-3xl mx-auto'>
            Outer Wilds is a game best experienced once, but its magic lives on
            through new explorers.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={{
                // Individual item fade/slide
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card
                key={feature.title}
                className='bg-card border-border text-center p-6 flex flex-col items-center'
              >
                <CardHeader className='p-0 mb-4'>
                  <feature.icon
                    className='h-10 w-10 text-primary'
                    strokeWidth={1.5}
                  />
                </CardHeader>
                <CardContent className='p-0 flex flex-col items-center'>
                  <CardTitle className='text-xl font-semibold mb-2'>
                    {feature.title}
                  </CardTitle>
                  <p className='text-sm text-muted-foreground'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <Button
            asChild
            size='lg'
            className='text-base bg-primary hover:bg-orange-400'
          >
            <Link href='/playthroughs'>Browse All Playthroughs</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
