import Hero from "@/components/landing/hero/Hero";
import Berita from "@/components/landing/berita/Berita";
import About from "@/components/landing/about/About";
import Navbar from "@/components/landing/navbar/Navbar";
import BackToTop from "@/components/landing/BackToTop";
import Rfc from "@/components/landing/rfc/Rfc";
import Footer from "@/components/footer/Footer";


export default function Home(){
  return (
    <div className="relative h-fit overflow-hidden">
      <Navbar />
      <BackToTop />
      <Hero />
      <Berita />
      <About />
      <Rfc />
      <Footer />
    </div>
  );
}