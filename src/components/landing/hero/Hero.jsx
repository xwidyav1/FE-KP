"use client"

import { useState } from "react";
import FadeIn from "@/components/transitions/FadeIn";
import Image from "next/image";
import { hero_content } from "./hero_content";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hero_content.length);
  };

  // Function to go to the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? hero_content.length - 1 : prevIndex - 1
    );
  };

  const { content, tokoh, image } = hero_content[currentIndex];

  return (
    <div className="w-screen max-w-full h-auto md:h-[55vw] gap-y-[10vw] md:gap-y-[4vw] px-[5vw] md:px-[10vw] py-[9vw] overflow-x-clip relative">
      <FadeIn direction="down" order={2} duration={1}>
        <div className="relative w-[80vw] aspect-[1590/727] rounded-[5vw] md:rounded-[1vw] shadow-[0_0.52vw_2.2vw_0_rgba(0,0,0,0.25)]">
          <Image
            src={image}
            alt="hero"
            fill
            style={{
              objectFit: "cover",
              borderRadius: "inherit",
              opacity: 1,
            }}
            draggable="false"
          />
          <div className="absolute w-[60vw] flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-y-[2vw] z-10">
            <h1 className="text-[2.7vw] text-white font-bold">{content}</h1>
            <h3 className="text-[2vw] text-white font-semibold">{tokoh}</h3>
          </div>
        </div>
      </FadeIn>
      {/* Navigation Controls */}
      <div className="absolute flex justify-between items-center top-1/2 transform -translate-y-1/2 w-[80vw]">
        <button
          onClick={handlePrev}
          className=" text-white p-2 hover:text-gray-300 transition"
        >
          <IoIosArrowBack className="text-[2.5vw]"/>
        </button>
        <button
          onClick={handleNext}
          className="text-white p-2 hover:text-gray-300 transition"
        >
          <IoIosArrowForward className="text-[2.5vw]"/>
        </button>
      </div>
    </div>
  );
};

export default Hero;
