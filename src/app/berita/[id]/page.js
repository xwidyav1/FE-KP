"use client"

import Berita from "@/components/berita/Berita";
import Navbar from "@/components/galeri/Navbar";
import Footer from "@/components/footer/Footer";
import BackToTop from "@/components/landing/BackToTop";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      const id = resolvedParams?.id || "1"; // Default ke "1" jika `id` tidak valid
      setCurrentPage(parseInt(id, 10));
      setIsLoading(false); // Loading selesai setelah params resolved
    };

    fetchParams();
  }, [params]);

  if (isLoading) {
    // Placeholder loading
    return (
      <div className="min-h-screen">
      </div>
    );
  }

  const handlePageChange = (newPage) => {
    router.push(`/berita/${newPage}`);
  };

  return (
    <div className="relative h-fit overflow-hidden">
      <Navbar />
      <BackToTop />
      <Berita 
        currentPage={currentPage - 1} // Karena index array dimulai dari 0
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}