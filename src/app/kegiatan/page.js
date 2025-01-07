import Navbar from "@/components/galeri/Navbar";
import Footer from "@/components/footer/Footer";
import Kegiatan from "@/components/kegiatan/Kegiatan";

export default function home() {
  return (
    <div className="relative h-fit overflow-hidden">
      <Navbar />
      <Kegiatan />
      <Footer />
    </div>
  )
}