"use client";

import { useActionState } from "react";
import type { CategoryFormState } from "@/app/actions/category-actions";

export default function CategoryForm({
  action,
  initial,
}: {
  action: (prevState: CategoryFormState, formData: FormData) => Promise<CategoryFormState>;
  initial?: { name: string; emoji: string | null };
}) {
  const [state, formAction, isPending] = useActionState<CategoryFormState, FormData>(action, undefined);

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

      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="emoji">
        Emoji (optional)
      </label>
      <input
        id="emoji"
        name="emoji"
        type="text"
        maxLength={8}
        defaultValue={initial?.emoji ?? ""}
        placeholder="🔷"
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
      />

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
