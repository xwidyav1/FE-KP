"use client";

import { useState, useEffect } from "react";
import { HiArrowUp } from "react-icons/hi";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed group overflow-clip bottom-[5vw] md:bottom-[2vw] right-[5vw] md:right-[2vw] bg-shade-white text-neutral-900 text-[2vw] md:text-[1.8vw] size-[16vw] md:size-[5vw] rounded-[100vw] shadow-[0_1.5vw_3.5vw_0_rgba(0,0,0,0.15)] md:shadow-[0_0.01vw_0.9vw_0vw_rgba(0,0,0,0.25)] hover:bg-neutral-900 hover:text-white transition duration-100 z-[999]">
        <div className="mx-auto absolute w-full bottom-[3vw] md:bottom-[1.7vw] left-[1.65vw] group-hover:-translate-y-[12vw] md:group-hover:-translate-y-[4.1vw] transition duration-700 ease-out">
          <HiArrowUp />
        </div>
        <div className="mx-auto absolute w-full -bottom-[9vw] md:-bottom-[2.5vw] left-[1.65vw] group-hover:-translate-y-[12vw] md:group-hover:-translate-y-[4.1vw] transition duration-700 ease-out">
          <HiArrowUp />
        </div>
      </button>
    )
  );
};

export default BackToTop;
