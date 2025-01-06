"use client"

import Berita from "@/components/berita/Berita";
import Navbar from "@/components/galeri/Navbar";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Home({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const currentPage = parseInt(id, 10) || 1;

  const handlePageChange = (newPage) => {
    router.push(`/berita/${newPage}`);
  };

  return (
    <div className="relative h-fit overflow-hidden">
      <Navbar />
      <Berita 
        currentPage={currentPage - 1} // Karena index array dimulai dari 0
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}