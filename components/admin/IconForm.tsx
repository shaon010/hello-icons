"use client";

import { useActionState } from "react";
import Image from "next/image";
import type { IconFormState } from "@/app/actions/icon-actions";
import type { Category } from "@/types/icon";

export default function IconForm({
  action,
  categories,
  initial,
}: {
  action: (prevState: IconFormState, formData: FormData) => Promise<IconFormState>;
  categories: Category[];
  initial?: { name: string; categoryId: number; svgPath: string };
}) {
  const [state, formAction, isPending] = useActionState<IconFormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        required
        defaultValue={initial?.name}
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
      />

      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="categoryId">
        Category
      </label>
      <select
        id="categoryId"
        name="categoryId"
        required
        defaultValue={initial?.categoryId ?? ""}
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="svg">
        SVG File {initial && "(leave empty to keep current)"}
      </label>
      <input
        id="svg"
        name="svg"
        type="file"
        accept="image/svg+xml"
        required={!initial}
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
      />
      {initial && (
        <Image src={initial.svgPath} alt={initial.name} width={48} height={48} className="mb-4 h-12 w-12" />
      )}

      {state?.error && <p className="mb-4 text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
