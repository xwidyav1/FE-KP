"use client";

import React from 'react';
import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { fetchPosts} from "@/components/berita/berita_content";
import FadeIn from "@/components/transitions/FadeIn";
import { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Berita = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [initialPage, setInitialPage] = useState(0);
  

  useEffect(() => {
      const getPosts = async () => {
        try {
          const data = await fetchPosts();
          setPosts(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      getPosts();
    }, []);
    useEffect(() => {
      setCurrentPage(initialPage); // Atur halaman awal berdasarkan prop
    }, [initialPage]);
  const sortedBerita = posts.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

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
            <Link href={`/artikel/${mainBerita.slug}`} className="relative w-full md:w-[38vw] max-md:h-[54vw] overflow-hidden">
              <Image
                src={`${BACKEND_URL}/storage/${mainBerita.image}`}
                alt="berita"
                fill
                className="object-cover transition-transform duration-1000 ease-in-out md:hover:scale-110"
                draggable="false"
              />
            </Link>
            <div className="md:w-[42vw] flex flex-col p-[3vw] md:p-[1.4vw] gap-y-[1vw] md:gap-y-[0.5vw]">
              <p href="/" className="w-fit text-[3vw] md:text-[1vw] text-[#012247]">
                {mainBerita.category}
              </p>
              <Link href={`/artikel/${mainBerita.slug}`} className="w-fit font-semibold text-[5vw] md:text-[1.5vw] line-clamp-2 max-md:leading-[6vw] text-[#012247] hover:underline">
                {mainBerita.title}
              </Link>
              <p className="text-[2.5vw] md:text-[0.9vw] text-gray-500">
                {mainBerita.updated_at}
              </p>
              <div 
                className="max-md:hidden text-[1vw] overflow-hidden text-ellipsis whitespace-normal max-h-[10vw] prose md:prose-xl"
                dangerouslySetInnerHTML={{ __html: mainBerita.content }}
              />
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
              <Link href={`/artikel/${item.slug}`} className="relative max-md:min-w-[40.32vw] h-auto md:h-[13vw] overflow-hidden">
                <Image
                  src={`${BACKEND_URL}/storage/${item.image}`}
                  alt="berita"
                  fill
                  className="object-cover transition-transform duration-1000 ease-in-out md:hover:scale-110"
                  draggable="false"
                />
              </Link>
              <div className="flex flex-col md:h-[9vw] max-md:pl-[2vw] pt-[1vw] md:p-[1vw] gap-y-[1vw] md:gap-y-[0.1vw]">
                <p className="w-fit text-[3vw] md:text-[1vw] text-[#012247]">
                  {item.category}
                </p>
                <Link href={`/artikel/${item.slug}`} className="w-fit font-semibold text-[4vw] md:text-[1.3vw] line-clamp-2 max-md:leading-[5vw] text-[#012247] hover:underline">
                  {item.title}
                </Link>
                <p className="text-[2.2vw] md:text-[0.9vw] text-gray-500">
                  {item.updated_at}
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
