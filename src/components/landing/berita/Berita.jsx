"use client";

import React from 'react';
import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { berita } from "@/components/berita/berita_content"; // Pastikan path benar

const Berita = () => {
  // Sort berita berdasarkan tanggal terbaru
  const sortedBerita = berita.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Berita utama (pertama dalam daftar)
  const mainBerita = sortedBerita[0];

  // Berita lainnya
  const otherBerita = sortedBerita.slice(1, 4); // Ambil 3 berita berikutnya

  return (
    <div className="w-screen h-auto px-[10vw] mb-[10vw] flex flex-col gap-y-[1.6vw]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-x-[1vw] items-center">
          <div className="text-[2vw] font-semibold text-[#012247]">
            Berita Terbaru
          </div>
          <div className="w-[10vw] h-[0.15vw] bg-[#FFC600]"></div>
        </div>
        <div className="flex flex-row text-[1.2vw] items-center gap-x-[0.6vw]">
          <Link
            href="/berita/1"
            className="relative group flex items-center gap-x-[0.4vw] max-md:underline">
            Lihat Semua
            <HiArrowRight className="w-[5vw] md:w-[1.1vw] group-hover:translate-x-1 transition duration-300" />
            <span className="absolute max-md:hidden bottom-0 left-0 w-full h-[0.1vw] bg-neutral-900 origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-[1.75vw]">
        {/* Berita utama */}
        {mainBerita && (
          <div className="w-auto h-[22vw] flex flex-row rounded-[0.5vw] shadow-[0_0.1vw_0.4vw_0_rgba(0,0,0,0.1)] overflow-hidden">
            <Link href="/" className="relative w-[38vw] overflow-hidden">
              <Image
                src={mainBerita.image}
                alt="berita"
                fill
                className="object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                draggable="false"
              />
            </Link>
            <div className="w-[42vw] flex flex-col p-[1.4vw] gap-y-[0.5vw]">
              <Link href="/" className="w-fit text-[1vw] text-[#012247] hover:underline">
                {mainBerita.kategori}
              </Link>
              <Link href="/" className="w-fit font-semibold text-[1.5vw] line-clamp-2 text-[#012247] hover:underline">
                {mainBerita.title}
              </Link>
              <p className="text-[0.9vw] text-gray-500">
                {mainBerita.date}
              </p>
              <p className="text-[1vw] overflow-hidden text-ellipsis whitespace-normal max-h-[10vw]">
                {mainBerita.content}
              </p>
            </div>
          </div>
        )}
        {/* Berita lainnya */}
        <div className="w-auto flex flex-row gap-[1.75vw] justify-between">
          {otherBerita.map((item, index) => (
            <div
              key={index}
              className="w-[25.5vw] flex flex-col h-[22vw] rounded-[0.5vw] gap-y-[0.1vw] shadow-[0_0.2vw_0.4vw_0_rgba(0,0,0,0.1)] overflow-hidden">
              <Link href="/" className="relative h-[13vw] overflow-hidden">
                <Image
                  src={item.image}
                  alt="berita"
                  fill
                  className="object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                  draggable="false"
                />
              </Link>
              <div className="flex flex-col h-[9vw] p-[1vw] gap-y-[0.1vw]">
                <Link href="/" className="w-fit text-[1vw] text-[#012247] hover:underline">
                  {item.kategori}
                </Link>
                <Link href="/" className="w-fit font-semibold text-[1.3vw] line-clamp-2 text-[#012247] hover:underline">
                  {item.title}
                </Link>
                <p className="text-[0.9vw] text-gray-500">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Berita;
