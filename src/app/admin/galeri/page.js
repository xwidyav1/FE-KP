import Galeri from "@/components/admin/galeri/Galeri";
import TabelGaleri from "@/components/admin/galeri/TabelGaleri";

export default function galeri() {
  return (
    <div className="relative">
      <Galeri />
      <TabelGaleri />
    </div>
  )
}