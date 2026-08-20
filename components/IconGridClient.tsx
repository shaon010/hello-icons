"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import IconModal from "./IconModal";
import type { IconItem } from "@/types/icon";

export default function IconGridClient({ icons }: { icons: IconItem[] }) {
  const [selectedIcon, setSelectedIcon] = useState<IconItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (icon: IconItem) => {
    setSelectedIcon(icon);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedIcon(null);
  };

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-14 text-center">
          <span className="font-semibold uppercase tracking-wider text-blue-600">
            Featured Icons
          </span>

          <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Popular Icon Collection
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Browse thousands of modern SVG icons for web, mobile,
            React, Figma and more.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

          {icons.map((icon) => (
            <div
              key={icon.id}
              onClick={() => openModal(icon)}
              className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
            >
            <div className="mb-5 flex justify-center">
                <Image
                    src={icon.svgPath}
                    alt={icon.name}
                    width={56}
                    height={56}
                    className="h-14 w-14"
                />
            </div>

              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                {icon.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {icon.category.name}
              </p>

              <button className="mt-5 w-full rounded-lg bg-gray-100 py-2 text-sm font-medium transition hover:bg-blue-600 hover:text-white">
                Preview
              </button>
            </div>
          ))}

        </div>

        {/* View All */}
        <div className="mt-14 text-center">
          <Link
            href="/icons"
            className="inline-flex rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            View All Icons →
          </Link>
        </div>

      </div>

      {/* Popup Modal */}
      <IconModal
        isOpen={isOpen}
        onClose={closeModal}
        icon={selectedIcon}
      />
    </section>
  );
}
