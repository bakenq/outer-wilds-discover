"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Orbit, Menu } from "lucide-react";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className='sticky top-0 z-40 w-full border-b border-border/40 bg-card/80 backdrop-blur-lg'>
      <nav className='container mx-auto px-4 h-16 flex justify-between items-center'>
        <Link
          href='/'
          className='group font-bold text-lg sm:text-xl text-foreground hover:text-primary transition-colors flex items-center gap-2'
          onClick={closeSheet}
        >
          <Orbit
            className='h-5 w-5 text-foreground transition-colors group-hover:text-primary'
            strokeWidth={2}
          />
          <span className='hidden sm:inline'>Outer Wilds Discover</span>
          <span className='sm:hidden'>OW Discover</span>
        </Link>
        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
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
          {/* Desktop Submit Placeholder*/}
          <Button size='sm' variant='secondary'>
            Submit
          </Button>
        </div>

        {/* Mobile Menu Trigger*/}
        <div className='md:hidden'>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='hover:bg-secondary'
              >
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[280px] bg-card border-border'
            >
              {/* Sheet Header */}
              <SheetHeader className='mb-6 text-left'>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription className='sr-only'>
                  Site navigation links
                </SheetDescription>
              </SheetHeader>

              {/* Mobile Navigation Links */}
              <nav className='flex flex-col space-y-4'>
                <SheetClose asChild>
                  <Link
                    href='/playthroughs'
                    className='text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2'
                  >
                    Playthroughs
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href='/about'
                    className='text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2'
                  >
                    About
                  </Link>
                </SheetClose>
                {/* Separator */}
                <hr className='border-border/40 my-4' />
                {/* Mobile Submit Button */}
                <SheetClose asChild>
                  <Button variant='secondary'>
                    Submit {/* Link or action later */}
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
