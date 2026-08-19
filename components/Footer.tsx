import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-bold text-white"
            >
              Dock<span className="text-blue-500">Icons</span>
            </Link>

            <p className="mt-4 text-gray-400 leading-7">
              Premium SVG icons, illustrations, and UI resources for
              designers and developers. Build faster with beautiful assets.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                X
              </a>

              <a
                href="#"
                className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                GitHub
              </a>

              <a
                href="#"
                className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Product
            </h3>

            <ul className="space-y-3">
              <li><Link href="/icons" className="hover:text-white">Icons</Link></li>
              <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Company
            </h3>

            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Stay Updated
            </h3>

            <p className="text-gray-400 mb-4">
              Get the latest icons, design resources, and product updates.
            </p>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} DockIcons. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>

            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}