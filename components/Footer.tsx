import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-card py-8 md:py-12 text-sm'>
      <div className='container mx-auto px-4'>
        {/* Column Grid*/}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Column 1: Brand/About */}
          <div className='md:col-span-1'>
            <h3 className='font-semibold text-foreground mb-3'>
              Outer Wilds Discover
            </h3>
            <p className='text-muted-foreground text-xs leading-relaxed'>
              A fan-made website dedicated to helping Outer Wilds enthusiasts
              find their next playthrough to watch. Explore the universe again
              through fresh eyes.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className='md:col-span-1'>
            <h4 className='font-medium text-foreground mb-3'>Quick Links</h4>
            <ul className='space-y-2 text-xs'>
              <li>
                <Link
                  href='/'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/playthroughs'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  All Playthroughs
                </Link>
              </li>
              {/* Add About link later */}
              <li>
                <Link
                  href='/about'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  About
                </Link>
              </li>
              {/* Add Submit link later */}
              <li>
                <Link
                  href='/submit'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Submit Playthrough
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className='md:col-span-1'>
            <h4 className='font-medium text-foreground mb-3'>Resources</h4>
            <ul className='space-y-2 text-xs'>
              <li>
                <a
                  href='https://www.mobiusdigitalgames.com/outer-wilds.html'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Official Game Site
                </a>
              </li>
              <li>
                <a
                  href='https://store.steampowered.com/app/753640/Outer_Wilds/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Steam Page
                </a>
              </li>
              {/* Add link to your GitHub repo for portfolio */}
              <li>
                <a
                  href='YOUR_GITHUB_REPO_LINK'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-8 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground'>
          <p>© {currentYear} Outer Wilds Discover. All rights reserved.</p>
          <p className='mt-1'>
            Not affiliated with Mobius Digital or Annapurna Interactive.
          </p>
        </div>
      </div>
    </footer>
  );
}
