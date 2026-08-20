"use client";

import Image from "next/image";
import type { IconItem } from "@/types/icon";

interface IconModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: IconItem | null;
}

export default function IconModal({
  isOpen,
  onClose,
  icon,
}: IconModalProps) {
  if (!isOpen || !icon) return null;

  const downloadSVG = async () => {
    const response = await fetch(icon.svgPath);
    const svg = await response.text();

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${icon.name}.svg`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const copySVG = async () => {
    const response = await fetch(icon.svgPath);
    const svg = await response.text();

    await navigator.clipboard.writeText(svg);
    alert("SVG copied!");
  };

  const copyReactCode = async () => {
    const code = `import Image from "next/image";

<Image
  src="${icon.svgPath}"
  alt="${icon.name}"
  width={24}
  height={24}
/>`;
    await navigator.clipboard.writeText(code);
    alert("React code copied!");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <p className="text-sm text-gray-500">{icon.category.name}</p>
            <h2 className="text-3xl font-bold">{icon.name}</h2>
          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="grid gap-10 p-8 md:grid-cols-2">
          {/* Preview */}
          <div className="flex items-center justify-center rounded-xl border bg-gray-50 p-10">
            <Image
              src={icon.svgPath}
              alt={icon.name}
              width={220}
              height={220}
              className="h-56 w-56"
            />
          </div>

          {/* Right Side */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Customize
            </h3>

            {/* Color Picker */}
            <label className="mb-2 block text-sm font-medium">
              Color
            </label>

            <input
              type="color"
              defaultValue="#000000"
              className="mb-6 h-12 w-full rounded-lg border cursor-pointer"
            />

            {/* Buttons */}
            <button
              onClick={downloadSVG}
              className="mb-3 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Download SVG
            </button>

            <button
              onClick={copySVG}
              className="mb-3 w-full rounded-lg border py-3 hover:bg-gray-100"
            >
              Copy SVG
            </button>

            <button
              onClick={copyReactCode}
              className="w-full rounded-lg border py-3 hover:bg-gray-100"
            >
              Copy React Code
            </button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="border-t bg-gray-50 p-6">
          <p className="mb-2 font-semibold">React Usage</p>

          <pre className="overflow-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
{`import Image from "next/image";

<Image
  src="${icon.svgPath}"
  alt="${icon.name}"
  width={24}
  height={24}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}