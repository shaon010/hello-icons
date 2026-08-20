import { notFound } from "next/navigation";
import IconForm from "@/components/admin/IconForm";
import { getIconById } from "@/lib/data/icons";
import { getCategories } from "@/lib/data/categories";
import { updateIconAction } from "@/app/actions/icon-actions";

export default async function EditIconPage({ params }: PageProps<"/admin/icons/[id]/edit">) {
  const { id } = await params;
  const [icon, categories] = await Promise.all([getIconById(Number(id)), getCategories()]);
  if (!icon) notFound();

  const boundAction = updateIconAction.bind(null, icon.id);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Edit Icon</h1>
      <IconForm
        action={boundAction}
        categories={categories}
        initial={{ name: icon.name, categoryId: icon.category.id, svgPath: icon.svgPath }}
      />
    </div>
  );
}
