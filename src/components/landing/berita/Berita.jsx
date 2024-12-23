"use client"

import React from 'react';
import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const Berita = () => {
  return (
    <div className="w-screen h-auto px-[10vw] mb-[10vw] flex flex-col gap-y-[1.6vw]">
      <div className="flex flex-row justify-between">
        <div className="text-[2vw] font-semibold">
          Berita Terbaru
        </div>
        <div className="flex flex-row text-[1.2vw] items-center gap-x-[0.6vw]">
          <Link
            href="https://www.chatgpt.com/"
            target="_blank"
            className="relative group flex items-center gap-x-[0.4vw] max-md:underline">
            Lihat Semua
            <HiArrowRight className="w-[5vw] md:w-[1.1vw] group-hover:translate-x-1 transition duration-300" />
            <span className="absolute max-md:hidden bottom-0 left-0 w-full h-[0.1vw] bg-neutral-900 origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-[1.75vw]">
        <div className="w-auto h-[22vw] flex flex-row rounded-[1vw] shadow-[0_0.1vw_0.4vw_0_rgba(0,0,0,0.1)] overflow-hidden">
          <button className="relative w-[38vw] overflow-hidden">
            <Image
              src="/hero1.jpeg"
              alt="berita"
              fill
              className="object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
              draggable="false"
            />
          </button>
          <div className="w-[42vw] flex flex-col p-[1.4vw] gap-y-[0.5vw]">
            <p className="text-[1vw]">
              Kategori
            </p>
            <h1 className="font-semibold text-[1.5vw] line-clamp-2">
              Judul Berita Terbaru Terkait CSIRT KEMHAN RI sangat panjang sekali lagilagiaa galaioif agfaua ffadfadfoa ga gain aadda aoni
            </h1>
            <p className="text-[1vw] text-gray-500">
              19 Desember 2024, 12.55
            </p>
            <p className="text-[1.1vw] overflow-hidden text-ellipsis whitespace-normal max-h-[10vw]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="w-auto flex flex-row gap-[1.75vw] justify-between">
          <div className="w-[25.5vw] flex flex-col h-[22vw] rounded-[1vw] gap-y-[0.1vw] shadow-[0_0.2vw_0.4vw_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="relative h-[13vw] overflow-hidden">
              <Image 
                src="/hero1.jpeg"
                alt="berita"
                fill
                className="object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                draggable="false"
              />
            </div>
            <div className="flex flex-col h-[9vw] p-[1vw] gap-y-[0.1vw]">
              <p className="text-[1vw]">
                Kategori
              </p>
              <h1 className="font-semibold text-[1.3vw] line-clamp-2">
                Judul Berita Terbaru Terkait CSIRT KEMHAN RI hai hai hai hai hai hai hai hai ahi ahia hai ahaia ahai 
              </h1>
              <p className="text-[1vw] text-gray-500">
                19 Desember 2024, 12.55
              </p>
            </div>
          </div>
          <div className="w-[25.5vw] flex flex-col h-[22vw] rounded-[1vw] gap-y-[0.1vw] shadow-[0_0.2vw_0.4vw_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="relative h-[13vw] overflow-hidden">
              <Image 
                src="/hero1.jpeg"
                alt="berita"
                fill
                className="object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                draggable="false"
              />
            </div>
            <div className="flex flex-col h-[9vw] p-[1vw] gap-y-[0.1vw]">
              <p className="text-[1vw]">
                Kategori
              </p>
              <h1 className="font-semibold text-[1.3vw] line-clamp-2">
                Judul Berita Terbaru Terkait CSIRT KEMHAN RI
              </h1>
              <p className="text-[1vw] text-gray-500">
                19 Desember 2024, 12.55
              </p>
            </div>
          </div>
          <div className="w-[25.5vw] flex flex-col h-[22vw] rounded-[1vw] gap-y-[0.1vw] shadow-[0_0.2vw_0.4vw_0_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="relative h-[13vw] overflow-hidden">
              <Image 
                src="/hero1.jpeg"
                alt="berita"
                fill
                className="object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                draggable="false"
              />
            </div>
            <div className="flex flex-col h-[9vw] p-[1vw] gap-y-[0.1vw]">
              <p className="text-[1vw]">
                Kategori
              </p>
              <h1 className="font-semibold text-[1.3vw] line-clamp-2">
                Judul Berita Terbaru Terkait CSIRT KEMHAN RI
              </h1>
              <p className="text-[1vw] text-gray-500">
                19 Desember 2024, 12.55
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Berita
