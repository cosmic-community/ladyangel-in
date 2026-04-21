import Link from 'next/link'

export default function Hero() {
  return (
    <section className="gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <div className="inline-block px-4 py-1.5 bg-rose-100 text-rose-700 rounded-full text-sm font-semibold mb-6">
          ✨ The Female Reference
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="gradient-text">LadyAngel</span>
          <span className="text-gray-900"> • IN</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Discover independent women, wellness professionals, startup founders, event organisers, and creators — all in one beautiful community.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/advertisers" className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-semibold transition shadow-lg">
            Browse Profiles
          </Link>
          <Link href="/categories" className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-full font-semibold border border-gray-200 transition">
            Explore Categories
          </Link>
        </div>
      </div>
    </section>
  )
}