"use client";

import { deleteIconAction } from "@/app/actions/icon-actions";

export default function DeleteIconButton({ id }: { id: number }) {
  const boundAction = deleteIconAction.bind(null, id);

  return (
    <form action={boundAction}>
      <button
        type="submit"
        className="text-sm font-medium text-red-600 hover:text-red-700"
        onClick={(e) => {
          if (!confirm("Delete this icon?")) e.preventDefault();
        }}
      >
        Delete
      </button>
    </form>
  );
}
