import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Orbit } from "lucide-react";

export default function Header() {
  return (
    <header className='sticky top-0 z-40 w-full border-b border-border/80 bg-card/80 backdrop-blur-lg transition-colors duration-300 ease-in-out'>
      <nav className='container mx-auto px-4 h-16 flex justify-between items-center'>
        <Link
          href='/'
          className='group font-bold text-xl text-foreground hover:text-primary transition-colors flex items-center gap-2'
        >
          <Orbit
            className='h-5 w-5 text-foreground transition-colors group-hover:text-primary'
            strokeWidth={2}
          />
          <span>Outer Wilds Discover</span>
        </Link>
        {/* Navigation */}
        <div className='flex items-center gap-6'>
          <Link
            href='/playthroughs'
            className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
          >
            Playthroughs
          </Link>

          <Link
            href='/about'
            className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
          >
            About
          </Link>
          {/* Placeholders for now*/}
          <Button size='sm' variant='secondary'>
            Submit
          </Button>
        </div>
      </nav>
    </header>
  );
}
