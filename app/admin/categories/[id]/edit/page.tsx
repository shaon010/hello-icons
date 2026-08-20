import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { getCategoryById } from "@/lib/data/categories";
import { updateCategoryAction } from "@/app/actions/category-actions";

export default async function EditCategoryPage({ params }: PageProps<"/admin/categories/[id]/edit">) {
  const { id } = await params;
  const category = await getCategoryById(Number(id));
  if (!category) notFound();

  const boundAction = updateCategoryAction.bind(null, category.id);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Edit Category</h1>
      <CategoryForm action={boundAction} initial={{ name: category.name, emoji: category.emoji }} />
    </div>
  );
}
