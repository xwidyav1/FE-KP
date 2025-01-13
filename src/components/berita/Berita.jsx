"use client";

import React, { useState, useEffect } from "react";
import { berita } from "./berita_content";
import BeritaCard from "./BeritaCard";
import FadeIn from "@/components/transitions/FadeIn";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { fetchPosts } from "./berita_content";

const Berita = ({ currentPage: initialPage, onPageChange }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 6; // Maksimal 6 gambar per halaman
  const totalPages = Math.ceil(posts.length / itemsPerPage);
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

  const handleNextDesktop = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 2);
    }
  };

  const handlePrevDesktop = () => {
    if (currentPage > 0) {
      onPageChange(currentPage);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };
  
  const currentItems = posts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="relative md:h-fit w-full max-w-full min-h-screen px-[5vw] md:px-[5vw] max-md:mt-[10vw] mb-[20vw] md:mb-[15vw] max-md:pt-[15vw] md:mt-[10vw]">
      <FadeIn direction="down" order={2} className="md:hidden">
          <div className="w-auto flex flex-col gap-x-[2vw] justify-center mb-[5vw]">
              <h1 className="text-[6vw] md:text-[3vw] font-semibold text-[#012247]">
                Berita Terbaru
              </h1>
            <div className="w-[16vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600] place-content-center"></div>
          </div>         
        </FadeIn>
      <div className="flex flex-col items-start md:items-center gap-y-[5vw] md:gap-y-[1.2vw] rounded-[2vw] md:rounded-[1.8vw] bg-neutral-100 pt-[2vw] max-md:pt-[3vw] pb-[10vw] md:pb-[3vw] px-[4vw] md:px-[2vw]">
        <FadeIn direction="down" order={2} className="max-md:hidden">
          <div className="w-auto flex flex-col md:flex-row gap-x-[2vw] justify-center md:items-center">
            <div className="max-md:hidden w-[10vw] h-[0.15vw] bg-[#FFC600] place-content-center"></div>
              <h1 className="text-[6vw] md:text-[3vw] font-semibold text-[#012247]">
                Berita Terbaru
              </h1>
            <div className="w-[16vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600] place-content-center"></div>
          </div>         
        </FadeIn>

        <FadeIn className="max-md:hidden grid grid-cols-1 md:grid-cols-2 w-full h-auto justify-stretch items-stretch gap-[1.2vw] mt-[1vw] md:px-[0vw]">
          {currentItems.map((post, index) => (
            <div
              key={index}
              className="h-auto bg-white relative rounded-[4vw] md:rounded-[1vw] pt-[0vw] pb-[8vw] md:pb-[0vw] overflow-hidden">
              <BeritaCard post={post} index={index} />
            </div>
          ))}
        </FadeIn>

        <FadeIn className="md:hidden grid grid-cols-1 w-full h-auto justify-stretch items-stretch gap-[7vw] max-md:mr-[2vw] mt-[3vw]">
          {currentItems.map((post, index) => (
            <div
              key={index}
              className="h-auto bg-white relative rounded-[2vw] md:rounded-[1vw] pt-[0vw] pb-[0vw] md:pb-[0vw] overflow-hidden">
              <BeritaCard post={post} index={index} />
            </div>
          ))}
        </FadeIn>

        {/* Navigasi */}
        <div className="flex flex-row justify-end items-center w-full mt-[2vw] gap-x-[2vw] mr-[6vw]">
          <div className="text-black text-[3.5vw] md:text-[1vw]">
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className="flex flex-row justify-between gap-x-[0.5vw]">
            <button 
              className="flex items-center justify-center w-[8vw] h-[8vw] text-[5vw] md:w-[2.5vw] md:h-[2.5vw] md:text-[1.7vw] bg-white border-[0.3vw] md:border-[0.1vw] border-gray-300 rounded-[1vw] md:rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
              onClick={handleFirstPage}
              disabled={currentPage === 0}>
              <MdKeyboardDoubleArrowLeft />
            </button>
            <button 
              className="flex items-center justify-center w-[8vw] h-[8vw] text-[5vw] md:w-[2.5vw] md:h-[2.5vw] md:text-[1.7vw] bg-white border-[0.3vw] md:border-[0.1vw] border-gray-300 rounded-[1vw] md:rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
              onClick={handlePrevDesktop}
              disabled={currentPage === 0}>
              <MdKeyboardArrowLeft />  
            </button>
            <button 
              className="flex items-center justify-center w-[8vw] h-[8vw] text-[5vw] md:w-[2.5vw] md:h-[2.5vw] md:text-[1.7vw] bg-white border-[0.3vw] md:border-[0.1vw] border-gray-300 rounded-[1vw] md:rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
              onClick={handleNextDesktop}
              disabled={currentPage === totalPages - 1}>
              <MdKeyboardArrowRight />
            </button>
            <button 
              className="flex items-center justify-center w-[8vw] h-[8vw] text-[5vw] md:w-[2.5vw] md:h-[2.5vw] md:text-[1.7vw] bg-white border-[0.3vw] md:border-[0.1vw] border-gray-300 rounded-[1vw] md:rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
              onClick={handleLastPage}
              disabled={currentPage === totalPages - 1}>
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Berita;
