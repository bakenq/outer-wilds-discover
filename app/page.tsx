import Link from "next/link";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center p-8 sm:p-24 text-center'>
      <div className='max-w-2xl'>
        <h1 className='text-4xl sm:text-5xl font-bold mb-6 text-balance'>
          Welcome to Outer Wilds Discover
        </h1>
        <p className='text-lg sm:text-xl mb-8 text-neutral-700 dark:text-neutral-300 text-balance'>
          Rediscover the wonders of Outer Wilds by watching others experience it
          for the first time. Find curated playthroughs and let's plays right
          here.
        </p>
        <Link
          href='/playthroughs' // Link to the page we just created
          className='inline-block px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 text-lg'
        >
          Find Playthroughs
        </Link>
      </div>
      {/* You could add a subtle background image or graphic later */}
    </div>
  );
}
