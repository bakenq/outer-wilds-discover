import Link from "next/link";

export default function Header() {
  return (
    <header className='bg-card shadow-md sticky top-0 z-40'>
      <nav className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link
          href='/'
          className='font-bold text-xl text-foreground hover:text-primary'
        >
          Outer Wilds Discover
        </Link>
        <div>
          {/* Add more links here later if needed (e.g., About, Submit) */}
          <Link
            href='/playthroughs'
            className='text-muted-foreground hover:text-primary ml-4'
          >
            Browse
          </Link>
        </div>
      </nav>
    </header>
  );
}
