export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-neutral-50 dark:bg-neutral-950 mt-12 py-4 text-center text-xs text-neutral-500 dark:text-neutral-600'>
      <div className='container mx-auto px-4'>
        <p>© {currentYear} Outer Wilds Discover. All rights reserved.</p>
        <p className='mt-1'>
          Not affiliated with Mobius Digital or Annapurna Interactive.
        </p>
      </div>
    </footer>
  );
}
