"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, RotateCcw, /*Share2,*/ Link2, Star, Info } from "lucide-react";

const purposeItems = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Find new Outer Wilds playthroughs, lets plays, and reactions from a curated collection.",
  },
  {
    icon: RotateCcw,
    title: "Relive",
    description:
      "Experience the wonder and mystery of the game again through the fresh eyes of other explorers.",
  },
  {
    icon: Star,
    title: "Curated",
    description:
      "Focusing on providing quality, complete, or unique playthrough experiences.",
    // For submissions later:
    // icon: Share2, title: "Share", description: "Submit your favorite playthroughs for others to enjoy (feature coming soon!)."
  },
  {
    icon: Link2,
    title: "Connect",
    description:
      "Join a community of fans who share your love for Outer Wilds and its mysteries.",
  },
];

export default function AboutPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "backOut" },
    },
  };

  return (
    <div className='container mx-auto px-4 py-10 md:py-16 lg:py-20'>
      {/* Page Title Section */}
      <motion.div
        className='text-center mb-12 md:mb-16'
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4 text-balance'>
          About Outer Wilds Discover
        </h1>
        <p className='text-lg text-muted-foreground max-w-3xl mx-auto text-balance'>
          A community-driven site dedicated to preserving and sharing the magic
          of experiencing Outer Wilds for the first time.
        </p>
      </motion.div>

      {/* Mission + Features Grid Section */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className='grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-start mb-12 md:mb-16'
      >
        {/* Our Mission */}
        <div className='md:col-span-3 prose prose-base dark:prose-invert prose-p:text-muted-foreground prose-headings:text-foreground max-w-none'>
          <h2 className='text-3xl font-semibold mb-4 border-b border-border pb-2'>
            Our Mission
          </h2>
          <p>
            Outer Wilds is a game like no other—a narrative puzzle that can only
            be truly experienced once. Its sense of discovery, wonder, and
            revelation is something that cannot be repeated.
          </p>
          <p>
            But that doesn&apos;t mean the joy ends after your first
            playthrough. Many fans find a second life in the game by watching
            others experience it for the first time—reliving those moments of
            discovery and awe through fresh eyes.
          </p>
          <p>
            Outer Wilds Discover exists to help you find those shared
            experiences. Our curated collection of playthroughs aims to connect
            you with content creators who capture the spirit of exploration and
            emotion that makes Outer Wilds so special.
          </p>
        </div>

        {/* Features Grid */}
        <div className='md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5'>
          {purposeItems.map((item, index) => (
            <motion.div
              key={item.title}
              variants={gridItemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <Card className='bg-card border-border h-full flex flex-col items-center text-center p-5 pt-6 hover:border-primary/40 hover:shadow-lg transition-all duration-200'>
                <CardHeader className='p-0 mb-3'>
                  <item.icon
                    className='h-8 w-8 text-primary'
                    strokeWidth={1.5}
                  />
                </CardHeader>
                <CardContent className='p-0 flex flex-col items-center flex-grow'>
                  <CardTitle className='text-lg font-semibold mb-1.5'>
                    {item.title}
                  </CardTitle>
                  <p className='text-xs text-muted-foreground flex-grow'>
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Disclaimer Section */}
      {false && (
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Card className='bg-card border-border p-6'>
            <CardHeader className='p-0 mb-3 flex flex-row items-center space-x-2'>
              <Info className='h-5 w-5 text-muted-foreground' />{" "}
              {/* Info Icon */}
              <CardTitle className='text-xl font-semibold'>
                Fan Project Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0 prose prose-sm dark:prose-invert prose-p:text-muted-foreground max-w-none'>
              <p>
                Outer Wilds Discover is a fan-made website created out of love
                for Outer Wilds. We are not affiliated with, endorsed by, or in
                any way officially connected to Mobius Digital or Annapurna
                Interactive.
              </p>
              <p>
                All game content, names, and related intellectual property
                belong to their respective owners. This is a non-commercial
                project made by fans, for fans.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
