import Navbar from "@/components/layanan/Navbar";
import BackToTop from "@/components/landing/BackToTop";
import Footer from "@/components/footer/Footer";
import Layanan from "@/components/layanan/Layanan";

export default function Home() {
  return (
    <div className="relative h-fit overflow-hidden">
      <Navbar />
      <BackToTop />
      <Layanan />
      <Footer />
    </div>
  );
}