"use client"

import React from 'react';
import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";

const Berita = () => {
  return (
    <div className="w-screen h-auto px-[10vw] flex flex-col gap-y-[1.6vw]">
      <div className="flex flex-row justify-between">
        <div className="text-[2vw] font-semibold">
          Berita Terbaru
        </div>
        <button className="flex flex-row text-[1.2vw] items-center gap-x-[0.6vw]">
          Lihat Semua
          <HiArrowRight className="text-[1.5vw]" />
        </button>
      </div>
      <div className="flex flex-col gap-y-[1.5vw]">
        <div className="w-auto h-[20vw] flex flex-row shadow-[0_0.1vw_0.4vw_0_rgba(0,0,0,0.1)]">
          <div className="relative w-[60vw]">
            <Image
              src="/hero1.jpeg"
              alt="berita"
              fill
              style={{ objectFit: "cover" }}
              draggable="false"
            />
          </div>
          <div className="w-full p-[1vw]">
            <p>
              Kategori
            </p>
            <h1>
              Judul Berita Terbaru Terkait CSIRT KEMHAN RI
            </h1>
            <p>
              19 Desember 2024, 12.55
            </p>
            <p></p>
          </div>
        </div>
        <div className="flex flex-row gap-[1.5vw] justify-between">
          <div className="h-[22vw] shadow-[0_0.1vw_0.4vw_0_rgba(0,0,0,0.1)] flex-grow">
            
          </div>
          <div className="h-[22vw] shadow-[0_0.1vw_0.4vw_0_rgba(0,0,0,0.1)] flex-grow">
            
          </div>
          <div className="h-[22vw] shadow-[0_0.1vw_0.4vw_0_rgba(0,0,0,0.1)] flex-grow">
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Berita
