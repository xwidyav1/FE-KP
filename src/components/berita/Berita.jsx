"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { berita } from "./berita_content";
import BeritaCard from "./BeritaCard";
import FadeIn from "@/components/transitions/FadeIn";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Berita = ({ currentPage: initialPage, onPageChange }) => {
  const [isMobile, setIsMobile] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const sliderRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 6; // Maksimal 6 gambar per halaman
  const totalPages = Math.ceil(berita.length / itemsPerPage);

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
  
  const currentItems = berita.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleIndicatorClick = useCallback(
    (index) => {
      if (transitioning) return;
      setTransitioning(true);
      setCurrentIndex(index);
    },
    [transitioning]
  );

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;

      if (deltaX > 50) {
        // Swiped left
        handleNextMobile();
      } else if (deltaX < -50) {
        // Swiped right
        handlePrevMobile();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrevMobile = () => {
    if (transitioning || currentIndex === 0) return;
    setTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + berita_content.length) % berita_content.length
    );
  };

  const handleNextMobile = () => {
    if (transitioning || currentIndex === berita_content.length - 1) return;
    setTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % berita_content.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = transitioning
        ? "transform 0.4s ease-in-out"
        : "none";
      sliderRef.current.style.transform = `translateX(-${
        (currentIndex * 102.35) / berita.length
      }%)`;
    }

    const timer = setTimeout(() => setTransitioning(false), 400);
    return () => clearTimeout(timer);
  }, [currentIndex, transitioning]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative md:h-fit w-full max-w-full px-[5vw] md:px-[5vw] max-md:my-[10vw] md:mb-[15vw] md:mt-[10vw]">
      <div className="flex flex-col items-start md:items-center gap-y-[5vw] md:gap-y-[1.2vw] rounded-[1.8vw] bg-neutral-100 pt-[2vw] pb-[30vw] md:pb-[3vw] px-[2vw]">
        <FadeIn direction="down" order={2}>
          <div className="w-auto flex flex-row gap-x-[2vw] justify-center items-center">
            <div className="w-[10vw] h-[0.15vw] bg-[#FFC600] place-content-center"></div>
              <h1 className="text-[3vw] font-semibold text-[#012247]">
                Berita Terbaru
              </h1>
            <div className="w-[10vw] h-[0.15vw] bg-[#FFC600] place-content-center"></div>
          </div>         
        </FadeIn>

        {/* Berita Cards */}
        {isMobile ? (
          <div className="md:hidden block w-full relative h-[190w]">
            <div className="relative top-[5vw] flex justify-start gap-x-[2.4vw]">
              {berita.map((_, index) => (
                <button
                  key={index}
                  className={`rounded-[2vw] h-[2.4vw] md:h-[0.75vw] ${
                    index === currentIndex
                      ? "bg-neutral-900 w-[26vw] md:w-[6vw]"
                      : "bg-neutral-100 w-[8.667vw] md:w-[2vw]"
                  }`}
                  onClick={() => handleIndicatorClick(index)}
                />
              ))}
            </div>
            <div
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-[680%] top-0 left-0 flex gap-x-[15vw] mt-[20vw] transition-transform duration-300">
              {berita.map((value, index) => (
                <div
                  key={index}
                  className="bg-neutral-100 w-[90vw] md:hover:bg-shade-white md:hover:shadow-[0_0.52vw_1.56vw_0_rgba(0,0,0,0.15)] relative flex flex-col items-center rounded-[4vw] md:rounded-[1vw] pt-[1.5vw] pb-[8vw] md:pb-[2vw] overflow-hidden">
                  <BeritaCard value={value} index={index} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-md:hidden grid grid-cols-1 md:grid-cols-2 w-full h-[135vw] md:h-auto justify-stretch items-stretch gap-[1.2vw] mt-[1vw] md:px-[0vw]">
            {currentItems.map((value, index) => (
              <div
                key={index}
                className="h-auto bg-white relative rounded-[4vw] md:rounded-[1vw] pt-[0vw] pb-[8vw] md:pb-[0vw] overflow-hidden">
                <BeritaCard value={value} index={index} />
              </div>
            ))}
          </div>
        )}

        {/* Navigasi */}
        <div className="max-md:hidden flex flex-row justify-end items-center w-full mt-[2vw] gap-x-[2vw] mr-[6vw]">
          <div className="text-black text-[1vw]">
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className="flex flex-row justify-between gap-x-[0.5vw]">
            <button 
              className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
              onClick={handleFirstPage}
              disabled={currentPage === 0}>
              <MdKeyboardDoubleArrowLeft />
            </button>
            <button className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
              onClick={handlePrevDesktop}
              disabled={currentPage === 0}>
              <MdKeyboardArrowLeft />  
            </button>
            <button className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
              onClick={handleNextDesktop}
              disabled={currentPage === totalPages - 1}>
              <MdKeyboardArrowRight />
            </button>
            <button className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
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
