import IconForm from "@/components/admin/IconForm";
import { createIconAction } from "@/app/actions/icon-actions";
import { getCategories } from "@/lib/data/categories";

export default async function NewIconPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">New Icon</h1>
      <IconForm action={createIconAction} categories={categories} />
    </div>
  );
}
