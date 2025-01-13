"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchPosts } from "./galeri_content";
import GaleriCard from "./GaleriCard";
import FadeIn from "@/components/transitions/FadeIn";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
const BACKEND_URL = 'http://localhost:8000'; 
const Galeri = ({ currentPage: initialPage, onPageChange }) => {
  const [posts, setPosts] = useState([]);
  const [isMobile, setIsMobile] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const sliderRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
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
      (prevIndex) => (prevIndex - 1 + aitypes.length) % aitypes.length
    );
  };

  const handleNextMobile = () => {
    if (transitioning || currentIndex === aitypes.length - 1) return;
    setTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % aitypes.length);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = transitioning
        ? "transform 0.4s ease-in-out"
        : "none";
      sliderRef.current.style.transform = `translateX(-${
        (currentIndex * 102.35) / posts.length
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
  if (loading) return <p className="min-h-screen">Loading...</p>;
  if (error) return <p className="min-h-screen">Error: {error}</p>;

  return (
    <div className="relative md:h-fit w-full max-w-full min-h-screen px-[5vw] md:px-[10.8vw] max-md:my-[10vw] md:mb-[15vw] md:mt-[10vw]">
      <div className="flex flex-col items-start md:items-center gap-y-[5vw] md:gap-y-[1.2vw] rounded-[1.8vw] border-neutral-100 md:border-[0.2vw] pt-[15vw] md:pt-[2vw] pb-[30vw] md:pb-[3vw]">
        <FadeIn direction="down" order={2}>
          <div className="w-auto flex flex-col md:flex-row gap-x-[2vw] justify-center md:items-center">
            <div className="max-md:hidden w-[10vw] h-[0.15vw] bg-[#FFC600] place-content-center"></div>
              <h1 className="text-[6vw] md:text-[3vw] font-semibold text-[#012247]">
                Galeri
              </h1>
            <div className="w-[18.5vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600] place-content-center"></div>
          </div>         
        </FadeIn>

        {/* Galeri Cards */}
        {/* {isMobile ? (
          <div className="md:hidden block w-full relative h-[190w]">
            <div className="relative top-[5vw] flex justify-start gap-x-[2.4vw]">
              {posts.map((post, index) => (
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
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="bg-neutral-100 w-[90vw] md:hover:bg-shade-white md:hover:shadow-[0_0.52vw_1.56vw_0_rgba(0,0,0,0.15)] relative flex flex-col items-center rounded-[4vw] md:rounded-[1vw] pt-[1.5vw] pb-[8vw] md:pb-[2vw] overflow-hidden">
                  <GaleriCard post={post} index={index} />
                </div>
              ))}
            </div>
          </div>
        ) : ( */}
          <FadeIn className="grid grid-cols-1 md:grid-cols-3 w-full h-auto md:h-[35vw] justify-stretch items-stretch gap-[5vw] md:gap-[1.2vw] max-md:pt-[1vw] md:mt-[1vw] md:px-[3vw]">
            {currentItems.map((post, index) => (
              <div
                key={index}
                className="md:h-[17vw] bg-neutral-200 md:hover:bg-white md:hover:shadow-[0_0.52vw_1.56vw_0_rgba(0,0,0,0.15)] relative flex flex-col items-center rounded-[2vw] md:rounded-[1vw] pt-[1vw] pb-[3.5vw] md:pb-[2vw] overflow-hidden transition-all duration-800 ease-in-out group md:hover:pt-[1vw]">
                <GaleriCard post={post} index={index} />
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

export default Galeri;
