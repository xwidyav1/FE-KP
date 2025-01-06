"use client"

import Galeri from "@/components/galeri/Galeri";
import Navbar from "@/components/galeri/Navbar";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Home({ params }) {
  const router = useRouter();
  const { id } = use(params); // Baca parameter `id` dari URL
  const currentPage = parseInt(id, 10) || 1; // Halaman default adalah 1 jika `id` tidak valid

  const handlePageChange = (newPage) => {
    router.push(`/galeri/${newPage}`); // Perbarui URL saat halaman berubah
  };

  return (
    <div className="relative h-fit overflow-hidden">
      <Navbar />
      <Galeri
        currentPage={currentPage - 1} // Karena index array dimulai dari 0
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}
