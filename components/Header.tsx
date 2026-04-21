import Link from 'next/link'

export default function Header() {
  const navLinks = [
    { href: '/advertisers', label: 'Advertisers' },
    { href: '/listings', label: 'Listings' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/blog', label: 'Blog' },
    { href: '/events', label: 'Events' },
    { href: '/bookmarks', label: 'Bookmarks' },
    { href: '/categories', label: 'Categories' }
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">👼</span>
            <span className="font-bold text-xl gradient-text">LadyAngel • IN</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/categories" className="md:hidden text-sm text-rose-600 font-medium">Menu</Link>
        </div>
      </div>
    </header>
  )
}