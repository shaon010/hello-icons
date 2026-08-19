"use client";

import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            🚀 50,000+ Premium SVG Icons
          </span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-gray-700 md:text-5xl">
          Beautiful SVG Icons
          <span className="block text-blue-600">
            For Designers & Developers
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-gray-600">
          Discover thousands of beautifully crafted SVG icons, UI assets,
          illustrations, and icon packs. Perfect for websites, mobile apps,
          Figma, React, Vue, and more.
        </p>

        {/* Search */}
<div className="mt-12">
  <SearchBar />
</div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/icons"
            className="rounded-xl bg-blue-600 px-8 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            Browse Icons
          </Link>

          <Link
            href="/pricing"
            className="rounded-xl border border-gray-300 bg-white px-8 py-4 text-center font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Get Pro
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <h3 className="text-3xl font-bold text-blue-600">50K+</h3>
            <p className="mt-2 text-gray-500">SVG Icons</p>
          </div>

          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <h3 className="text-3xl font-bold text-blue-600">500+</h3>
            <p className="mt-2 text-gray-500">Categories</p>
          </div>

          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <h3 className="text-3xl font-bold text-blue-600">100%</h3>
            <p className="mt-2 text-gray-500">SVG Format</p>
          </div>

          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
            <p className="mt-2 text-gray-500">Updates</p>
          </div>
        </div>

      </div>
    </section>
  );
}