import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/data/categories";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <Navbar />
      <main className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="font-semibold uppercase tracking-wide text-blue-600">Categories</span>
            <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">Browse by Category</h1>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 text-5xl">{category.emoji ?? "🔷"}</div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">{category.name}</h3>
                <p className="mt-2 text-gray-500">
                  {category.iconCount} {category.iconCount === 1 ? "Icon" : "Icons"}
                </p>
                <div className="mt-6 font-medium text-blue-600">Explore →</div>
              </Link>
            ))}
            {categories.length === 0 && (
              <p className="col-span-full py-12 text-center text-gray-500">No categories yet.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
