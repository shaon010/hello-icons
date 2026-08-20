"use client";

import { useState } from "react";
import Image from "next/image";
import IconModal from "./IconModal";
import type { IconItem } from "@/types/icon";

export default function IconsPageGrid({ icons }: { icons: IconItem[] }) {
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
    <>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {icons.map((icon) => (
          <div
            key={icon.id}
            onClick={() => openModal(icon)}
            className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
          >
            <div className="mb-5 flex justify-center">
              <Image src={icon.svgPath} alt={icon.name} width={56} height={56} className="h-14 w-14" />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{icon.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{icon.category.name}</p>
          </div>
        ))}
        {icons.length === 0 && (
          <p className="col-span-full py-12 text-center text-gray-500">No icons yet.</p>
        )}
      </div>

      <IconModal isOpen={isOpen} onClose={closeModal} icon={selectedIcon} />
    </>
  );
}
