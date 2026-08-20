"use client";

import { useActionState } from "react";
import { deleteCategoryAction, type CategoryFormState } from "@/app/actions/category-actions";

export default function DeleteCategoryButton({ id }: { id: number }) {
  const boundAction = deleteCategoryAction.bind(null, id);
  const [state, formAction, isPending] = useActionState<CategoryFormState, FormData>(boundAction, undefined);

  return (
    <form action={formAction} className="inline-flex flex-col items-end gap-1">
      <button
        type="submit"
        disabled={isPending}
        className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-60"
        onClick={(e) => {
          if (!confirm("Delete this category?")) e.preventDefault();
        }}
      >
        Delete
      </button>
      {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
    </form>
  );
}
