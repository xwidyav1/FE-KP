import Hero from "@/components/landing/hero/Hero";
import Berita from "@/components/landing/berita/Berita";
import About from "@/components/landing/about/About";

export default function Home(){
  return (
    <div className="relative h-fit overflow-hidden">
      <Hero />
      <Berita />
      <About />
    </div>
  );
}