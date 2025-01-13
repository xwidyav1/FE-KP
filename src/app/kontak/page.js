import Navbar from "@/components/galeri/Navbar";
import Footer from "@/components/footer/Footer";
import Kontak from "@/components/kontak/Kontak";
import BackToTop from "@/components/landing/BackToTop";

export default function home() {
  return (
    <div className="relative h-fit overflow-hidden">
      <Navbar />
      <BackToTop />
      <Kontak />
      <Footer />
    </div>
  );
}