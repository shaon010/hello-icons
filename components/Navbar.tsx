"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
          >
            Dock<span className="text-blue-600">Icons</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>

            <Link href="/icons" className="hover:text-blue-600 transition">
              Icons
            </Link>

            <Link href="/categories" className="hover:text-blue-600 transition">
              Categories
            </Link>

            <Link href="/pricing" className="hover:text-blue-600 transition">
              Pricing
            </Link>

            <Link href="/blog" className="hover:text-blue-600 transition">
              Blog
            </Link>

            <Link href="/about" className="hover:text-blue-600 transition">
              About
            </Link>

          </nav>

          {/* Search */}
          <div className="hidden lg:block">
            <input
              type="text"
              placeholder="Search icons..."
              className="w-64 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-3">

            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>

            <Link
              href="/pricing"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Get Pro
            </Link>

          </div>

          {/* Mobile Menu */}
          <button className="md:hidden text-2xl">
            ☰
          </button>

        </div>

      </div>
    </header>
  );
}