"use client";

import Navbar from "@/components/galeri/Navbar";
import Footer from "@/components/footer/Footer";
import Kegiatan from "@/components/kegiatan/Kegiatan";
import BackToTop from "@/components/landing/BackToTop";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi data fetching atau operasi berat
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Durasi loading (500ms hanya untuk contoh)

    return () => clearTimeout(timer); // Bersihkan timer
  }, []);

  if (isLoading) {
    // Placeholder loading
    return (
      <div className="min-h-screen">
      </div>
    );
  }

  return (
    <div className="relative h-fit overflow-hidden">
      <Navbar />
      <BackToTop />
      <Kegiatan />
      <Footer />
    </div>
  )
}