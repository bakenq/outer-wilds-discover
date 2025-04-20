export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-card py-4 text-center text-xs text-muted-foreground z-40'>
      <div className='container mx-auto px-4'>
        <p>© {currentYear} Outer Wilds Discover. All rights reserved.</p>
        <p className='mt-1'>
          Not affiliated with Mobius Digital or Annapurna Interactive.
        </p>
      </div>
    </footer>
  );
}
