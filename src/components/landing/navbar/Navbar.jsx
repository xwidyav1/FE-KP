"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import HamButton from "./HamButton";
import { HiChevronRight } from "react-icons/hi";
import FadeIn from "@/components/transitions/FadeIn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const menu = [
  { section: "Beranda" },
  { section: "Tentang Kami" },
  { section: "RFC 2350" },
  { section: "Layanan" },
  { section: "Event" },
  { section: "Hubungi Kami" },
  { section: "Aduan Siber" },
];

const NavbarLanding = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (event) => {
    if (event.target === event.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  const handleClick = ({ topDsktp, topMb }) => {
    const isMobile = window.innerWidth < 768;
    const topInVw = isMobile ? topMb : topDsktp;
    const topInPixels = (topInVw * window.innerWidth) / 100;

    window.scrollTo({
      top: topInPixels,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Navbar Desktop */}
      <div
        className={`max-md:hidden fixed flex gap-x-[0.7vw] top-[1vw] left-0 right-0 mx-auto w-fit h-[7vw] p-[0.7vw] bg-white/50 rounded-[1vw] border-[0.1vw] border-white z-[1000] transition-transform duration-300 backdrop-blur-[0.4vw] ${
          visible ? "translate-y-0" : "-translate-y-[125%]"
        }`}>
        <FadeIn direction="down" order={2} className="h-full w-fit">
          <Link
            href="/"
            replace
            className="h-full w-[15vw] text-primary grid place-content-center">
            <div className="relative w-[15vw] aspect-[2114/579]">
              <Image
                src="/logo-csirt-kemhan.png"
                alt="logo CSIRT Kemhan"
                fill
                style={{ objectFit: "contain" }}
                draggable="false"
              />
            </div>
          </Link>
        </FadeIn>
        {menu.map((value, index) => (
          <div key={index} className="flex flex-row items-center justify-center gap-x-[0.8vw]">
            <FadeIn
              direction="down"
              order={2 + 0.5 * index}
              className="h-[2vw] w-[0.005vw] bg-neutral-300/50"></FadeIn>
            <FadeIn
              direction="down"
              order={2 + 0.5 * index}
              className="h-full w-fit">
              <button
                onClick={() => handleClick(value)}
                className="ml-[0.005vw] h-[5vw] w-[8vw] font-medium rounded-[0.6vw] bg-inherit text-neutral-700 text-lg-vw grid place-content-center transition-color duration-300 ease-in-out delay-100 hover:text-yellow-500">
                {value.section}
              </button>
            </FadeIn>
          </div>
        ))}
      </div>

      {/* Navbar Mobile */}
      <div
        className={`md:hidden fixed flex gap-x-[2vw] top-[5vw] right-[5vw] w-fit h-[15vw] p-[2vw] bg-shade-white/50 rounded-[2.5vw] border-[0.3vw] border-shade-white z-[1000] transition-transform duration-300 backdrop-blur-[1vw] ${
          visible ? "translate-y-0" : "-translate-y-[200%]"
        }`}>
        <FadeIn direction="down" order={2}>
          <Link
            href="#Hero"
            replace
            className="h-full w-[16vw] font-light rounded-[2vw] bg-neutral-900 text-primary text-sm-vw-mb grid place-content-center">
            <div className="relative w-[5vw] aspect-[2654/2185.8]">
              <Image
                src="/logo_abisa.png"
                alt="logo Abisa"
                fill
                style={{ objectFit: "contain" }}
                draggable="false"
              />
            </div>
          </Link>
        </FadeIn>
        <FadeIn
          direction="down"
          order={2}
          className="h-full w-[16vw] border-neutral-100/80 border-[0.2vw] rounded-[2vw] grid place-content-center">
          <HamButton active={isMenuOpen} toggleActive={toggleMenu} />
        </FadeIn>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 120,
            }}
            className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
            onClick={closeMenu}>
            <div className="absolute right-[5vw] top-[25vw] w-[60vw] bg-neutral-900/90 rounded-[2.5vw] border-[0.3vw] border-shade-white/50 py-[5vw] px-[3vw] flex flex-col gap-y-[2vw]">
              {menu.map((value, index) => (
                <FadeIn
                  direction="right"
                  order={0.5 * index}
                  key={index}
                  className="w-full h-fit py-[0.2vw]">
                  <button
                    onClick={() => {
                      handleClick(value);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex justify-between items-center py-[2vw] px-[4vw] text-shade-white font-medium text-sm-vw-mb hover:text-neutral-300 rounded-[1vw]">
                    {value.section}
                    <HiChevronRight className="text-base-vw-mb" />
                  </button>
                </FadeIn>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarLanding;
