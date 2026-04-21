export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">👼 LadyAngel • IN</h3>
            <p className="text-sm text-gray-400">The Female Reference — a community for independent women to showcase, connect, and grow.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/advertisers" className="hover:text-rose-400">Advertisers</a></li>
              <li><a href="/listings" className="hover:text-rose-400">Listings</a></li>
              <li><a href="/events" className="hover:text-rose-400">Events</a></li>
              <li><a href="/blog" className="hover:text-rose-400">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Social Dating</li>
              <li>Wellness & Therapies</li>
              <li>Casting & Jobs</li>
              <li>Women-owned Startups</li>
              <li>Event Organiser</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} LadyAngel • IN. All rights reserved.
        </div>
      </div>
    </footer>
  )
}