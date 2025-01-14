"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import FadeIn from "@/components/transitions/FadeIn";
import Image from "next/image";
import { hero_content } from "./hero_content";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [noTransition, setNoTransition] = useState(false);
  const intervalRef = useRef(null);

  const totalSlides = hero_content.length;

  const slides = [
    hero_content[totalSlides - 1],
    ...hero_content,
    hero_content[0],
  ];

  const clearCurrentInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startNewInterval = useCallback(() => {
    clearCurrentInterval();
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 5000);
  }, [clearCurrentInterval]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => prev + 1);
    startNewInterval();
  }, [startNewInterval]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => prev - 1);
    startNewInterval();
  }, [startNewInterval]);

  useEffect(() => {
    startNewInterval();
    return clearCurrentInterval;
  }, [startNewInterval, clearCurrentInterval]);

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setNoTransition(true);
        setCurrentIndex(totalSlides);
        setTimeout(() => setNoTransition(false), 50);
      }, 500);
    } else if (currentIndex === totalSlides + 1) {
      setTimeout(() => {
        setNoTransition(true);
        setCurrentIndex(1);
        setTimeout(() => setNoTransition(false), 50);
      }, 500);
    }
  }, [currentIndex, totalSlides]);

  return (
    <div id="Hero" className="w-screen max-w-full h-auto md:h-[55vw] gap-y-[10vw] md:gap-y-[4vw] px-[5vw] md:px-[10vw] py-[25vw] md:py-[9vw] overflow-x-clip relative">
      <FadeIn direction="down" order={2} duration={1}>
        <div className="relative w-[90vw] md:w-[80vw] max-md:h-[140vw] aspect-[1590/727] rounded-[3vw] md:rounded-[1vw] shadow-[0_0.52vw_2.2vw_0_rgba(0,0,0,0.25)] overflow-hidden">
          <div
            className={`flex h-full ${
              noTransition ? "" : "transition-transform duration-500 ease-in-out"
            }`}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full h-full relative"
              >
                <Image
                  src={slide.image}
                  alt={`hero ${index}`}
                  fill
                  className="object-cover opacity-90"
                  draggable="false"
                />
                <div className="absolute w-[70vw] md:w-[60vw] max-md:h-[100vw] flex flex-col max-md:justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-y-[15vw] md:gap-y-[2vw] z-10">
                  <h1 className="text-[7vw] md:text-[2.7vw] text-white font-bold">
                    {slide.content}
                  </h1>
                  <h3 className="text-[4.5vw] md:text-[2vw] text-white font-semibold">
                    {slide.tokoh}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Navigation Controls */}
      <div className="max-md:hidden absolute flex justify-between items-center top-1/2 transform -translate-y-1/2 w-[90vw] md:w-[80vw]">
        <button
          onClick={handlePrev}
          className="text-white p-2 hover:text-gray-300 transition"
        >
          <IoIosArrowBack className="text-[2.5vw]" />
        </button>
        <button
          onClick={handleNext}
          className="text-white p-2 hover:text-gray-300 transition"
        >
          <IoIosArrowForward className="text-[2.5vw]" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
