import Link from "next/link";

export default function Header() {
  return (
    <header className='bg-neutral-100 dark:bg-neutral-900 shadow-md'>
      <nav className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link
          href='/'
          className='font-bold text-xl hover:text-blue-600 dark:hover:text-blue-400'
        >
          Outer Wilds Discover
        </Link>
        <div>
          {/* Add more links here later if needed (e.g., About, Submit) */}
          <Link
            href='/playthroughs'
            className='text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 ml-4'
          >
            Browse
          </Link>
        </div>
      </nav>
    </header>
  );
}
