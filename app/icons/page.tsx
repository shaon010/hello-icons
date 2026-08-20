import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IconsPageGrid from "@/components/IconsPageGrid";
import { getIcons } from "@/lib/data/icons";

export default async function IconsPage() {
  const icons = await getIcons();

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="font-semibold uppercase tracking-wider text-blue-600">All Icons</span>
            <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">Browse Icons</h1>
          </div>
          <IconsPageGrid icons={icons} />
        </div>
      </main>
      <Footer />
    </>
  );
}
