import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import IconGrid from "@/components/IconGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <CategoryGrid />
        <IconGrid />
      </main>

      <Footer />
    </>
  );
}