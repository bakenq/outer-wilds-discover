import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className='sticky top-0 z-40 w-full border-b border-border/80 bg-card/80 backdrop-blur-lg transition-colors duration-300 ease-in-out'>
      <nav className='container mx-auto px-4 h-16 flex justify-between items-center'>
        {/* Logo? */}
        <Link
          href='/'
          className='font-bold text-xl text-foreground hover:text-primary transition-colors'
        >
          Outer Wilds Discover
        </Link>
        {/* Navigation */}
        <div className='flex items-center gap-6'>
          <Link
            href='/playthroughs'
            className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
          >
            Playthroughs
          </Link>

          {/* Placeholders for now*/}
          <Link
            href='/about'
            className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
          >
            About
          </Link>
          <Button size='sm' variant='secondary'>
            Submit
          </Button>
        </div>
      </nav>
    </header>
  );
}
