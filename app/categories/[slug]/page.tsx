import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IconsPageGrid from "@/components/IconsPageGrid";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getIconsByCategory } from "@/lib/data/icons";

export default async function CategoryDetailPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const icons = await getIconsByCategory(category.id);

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-3 text-5xl">{category.emoji ?? "🔷"}</div>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">{category.name}</h1>
          </div>
          <IconsPageGrid icons={icons} />
        </div>
      </main>
      <Footer />
    </>
  );
}
