import Hero from "@/components/landing/hero/Hero";
import Navbar from "@/components/landing/navbar/Navbar";
import Berita from "@/components/landing/berita/Berita";
import About from "@/components/landing/about/About";

export default function Home(){
  return (
    <div className="relative h-fit overflow-hidden">
      <Navbar />
      <Hero />
      <Berita />
      <About />
    </div>
  );
}