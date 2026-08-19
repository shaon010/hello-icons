"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;

    // Replace with your search page later
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center rounded-2xl border border-gray-300 bg-white shadow-lg overflow-hidden">

        {/* Search Icon */}
        <div className="px-5 text-gray-400 text-xl">
          🔍
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search icons, illustrations, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 py-4 pr-4 outline-none text-gray-700"
        />

        {/* Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Popular Searches */}
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {[
          "Business",
          "Social",
          "Finance",
          "AI",
          "Arrow",
          "Weather",
          "Medical",
          "Education",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setQuery(item)}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}