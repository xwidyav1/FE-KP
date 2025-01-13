"use client";

import React from 'react';
import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { berita } from "@/components/berita/berita_content";
import FadeIn from "@/components/transitions/FadeIn";

const Berita = () => {
  // Sort berita berdasarkan tanggal terbaru
  const sortedBerita = berita.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Berita utama (pertama dalam daftar)
  const mainBerita = sortedBerita[0];

  // Berita lainnya
  const otherBerita = sortedBerita.slice(1, 4); // Ambil 3 berita berikutnya

  return (
    <FadeIn className="w-screen h-auto px-[5vw] md:px-[10vw] mb-[10vw] flex flex-col gap-y-[1.6vw]">
      <FadeIn 
        direction="right"
        order={1}
        className="flex md:flex-row md:justify-between max-md:pb-[3vw]">
        <div className="flex flex-row gap-x-[2vw] md:gap-x-[1vw] items-center">
          <div className="text-[6vw] md:text-[2vw] font-semibold text-[#012247]">
            Berita Terbaru
          </div>
          <div className="w-[20vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600]"></div>
        </div>
        <div className="max-md:hidden flex flex-row text-[1.2vw] items-center gap-x-[0.6vw]">
          <Link
            href="/berita/1"
            className="relative group flex items-center gap-x-[0.4vw] max-md:underline">
            Lihat Semua
            <HiArrowRight className="w-[5vw] md:w-[1.1vw] group-hover:translate-x-1 transition duration-300" />
            <span className="absolute max-md:hidden bottom-0 left-0 w-full h-[0.1vw] bg-neutral-900 origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
          </Link>
        </div>
      </FadeIn>
      <div className="flex flex-col gap-y-[3vw] md:gap-y-[1.75vw]">
        {/* Berita utama */}
        {mainBerita && (
          <FadeIn
            direction="top"
            order={2} 
            className="w-[90vw] md:w-auto h-auto md:h-[22vw] flex flex-col md:flex-row rounded-[2vw] md:rounded-[0.5vw] shadow-[0_0.1vw_0.4vw_0_rgba(0,0,0,0.1)] overflow-hidden">
            <Link href="/" className="relative w-full md:w-[38vw] max-md:h-[54vw] overflow-hidden">
              <Image
                src={mainBerita.image}
                alt="berita"
                fill
                className="object-cover transition-transform duration-1000 ease-in-out md:hover:scale-110"
                draggable="false"
              />
            </Link>
            <div className="md:w-[42vw] flex flex-col p-[3vw] md:p-[1.4vw] gap-y-[1vw] md:gap-y-[0.5vw]">
              <p href="/" className="w-fit text-[3vw] md:text-[1vw] text-[#012247]">
                {mainBerita.kategori}
              </p>
              <Link href="/" className="w-fit font-semibold text-[5vw] md:text-[1.5vw] line-clamp-2 max-md:leading-[6vw] text-[#012247] hover:underline">
                {mainBerita.title}
              </Link>
              <p className="text-[2.5vw] md:text-[0.9vw] text-gray-500">
                {mainBerita.date}
              </p>
              <p className="max-md:hidden text-[1vw] overflow-hidden text-ellipsis whitespace-normal max-h-[10vw]">
                {mainBerita.content}
              </p>
            </div>
          </FadeIn>
        )}
        {/* Berita lainnya */}
        <FadeIn 
          direction="right md:bottom"
          order={3}
          className="w-auto flex flex-col md:flex-row gap-[3vw] md:gap-[1.75vw] justify-between">
          {otherBerita.map((item, index) => (
            <div
              key={index}
              className="md:w-[25.5vw] flex flex-row md:flex-col h-[25vw] md:h-[22vw] rounded-[1vw] md:rounded-[0.5vw] gap-y-[0.1vw] shadow-[0_0.2vw_0.4vw_0_rgba(0,0,0,0.1)] overflow-hidden">
              <Link href="/" className="relative max-md:min-w-[40.32vw] h-auto md:h-[13vw] overflow-hidden">
                <Image
                  src={item.image}
                  alt="berita"
                  fill
                  className="object-cover transition-transform duration-1000 ease-in-out md:hover:scale-110"
                  draggable="false"
                />
              </Link>
              <div className="flex flex-col md:h-[9vw] max-md:pl-[2vw] pt-[1vw] md:p-[1vw] gap-y-[1vw] md:gap-y-[0.1vw]">
                <p className="w-fit text-[3vw] md:text-[1vw] text-[#012247]">
                  {item.kategori}
                </p>
                <Link href="/" className="w-fit font-semibold text-[4vw] md:text-[1.3vw] line-clamp-2 max-md:leading-[5vw] text-[#012247] hover:underline">
                  {item.title}
                </Link>
                <p className="text-[2.2vw] md:text-[0.9vw] text-gray-500">
                  {item.date}
                </p>
              </div>
            </div>
          ))}

          <div className="md:hidden flex flex-row justify-end text-[3.5vw] items-center gap-x-[0.6vw] pt-[3vw] pb-[15vw]">
            <Link
              href="/berita/1"
              className="relative group flex items-center gap-x-[0.4vw] max-md:underline">
              Lihat Semua
              <HiArrowRight className="w-[5vw] md:w-[1.1vw] group-hover:translate-x-1 transition duration-300" />
              <span className="absolute max-md:hidden bottom-0 left-0 w-full h-[0.1vw] bg-neutral-900 origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </FadeIn>
  );
};

export default Berita;
