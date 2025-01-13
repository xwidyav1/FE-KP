import React from "react";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import Meteors from "@/components/decorations/Meteors";
import Footer from "@/components/footer/Footer";

const NotFound = () => {
  return (
    <div className="relative w-screen max-w-full h-[380vw] md:h-[77vw] bg-black overflow-x-clip z-0">
      <div className="flex flex-col justify-center items-center h-[187vw] md:h-[48vw] gap-y-[15vw] md:gap-y-[3vw]">
        <div className="flex flex-col gap-y-[5vw] md:gap-y-[0.8vw]">
          <h2 className="text-[7vw] md:text-[3vw] font-semibold text-center text-white">
            404 Not Found
          </h2>
          <p className="max-md:w-[60vw] text-xs-vw-mb md:text-[1vw] font-extralight text-center text-white">
            Oops! Looks like you stumbled onto a different dimension. Don&apos;t worry,
            <br className="max-md:hidden" /> just head back.
          </p>
        </div>
        <Link
          href="/"
          className="group overflow-hidden relative flex w-[47vw] md:w-[12vw] h-[11vw] md:h-[3vw] mx-auto gap-x-[5vw] md:gap-x-[1vw] transition duration-300 bg-[#FFC600] hover:bg-[#FFD900] text-neutral-900 text-sm-vw-mb md:text-lg-vw font-semibold py-[1.25vw] rounded-[1.7vw] md:rounded-[0.5vw] shadow-[0_1.5vw_3.5vw_0_rgba(0,0,0,0.15)] md:shadow-[0_0.52vw_1.56vw_0_rgba(0,0,0,0.15)] justify-center items-center">
          <HiArrowLeft className="w-[4vw] md:w-[1vw]" />
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          CSIRT Kemhan
        </Link>
      </div>
      <Footer />
      <Meteors number={6} className="z-10"/>
    </div>
  );
};

export default NotFound;