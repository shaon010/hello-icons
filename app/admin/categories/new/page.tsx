import CategoryForm from "@/components/admin/CategoryForm";
import { createCategoryAction } from "@/app/actions/category-actions";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">New Category</h1>
      <CategoryForm action={createCategoryAction} />
    </div>
  );
}
