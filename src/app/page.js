import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import BlogPreview from "@/components/BlogPreview";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutPreview />
        <BlogPreview />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
