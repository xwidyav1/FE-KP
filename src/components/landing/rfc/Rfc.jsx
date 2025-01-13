"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FadeIn from "@/components/transitions/FadeIn";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

const Rfc = () => {
  const [links, setLinks] = useState({
    id: "#",
    en: "#",
  });

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const backendUrl = "http://localhost:8000";
        const [idResponse, enResponse] = await Promise.all([
          axios.get(`${backendUrl}/documents/123`),
          axios.get(`${backendUrl}/documents/456`),
        ]);

        setLinks({
          id: `${idResponse.data.file_path}`,
          en: `${enResponse.data.file_path}`,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div
      id="rfc"
      className="relative h-[140vw] md:h-[50vw] w-full max-w-full px-[5vw] md:px-[10.8vw] py-[10vw] md:py-[8vw] max-md:mt-[10vw] max-md:mb-[30vw]"
    >
      <div
        className="relative flex flex-col md:items-center gap-y-[3vw] md:gap-y-[0vw] h-full md:h-[30vw] w-full bg-[#EBEBEB] border-white border-[1vw] md:border-[.5vw] rounded-[5vw] md:rounded-[1.2vw] shadow-[0_0.52vw_1.56vw_0_rgba(0,0,0,0.15)] "
      >
        <div className="flex flex-col gap-y-[10vw] md:gap-y-[2vw]  md:items-center p-[10vw] md:p-[4vw] z-10">
          <FadeIn direction="down" order={2}>
            <h2 className="text-[5.5vw] md:text-[1.5vw] text-[#012247] font-semibold">
              Dokumen RFC 2350
            </h2>
          </FadeIn>
          <FadeIn direction="down" order={2.5}>
            <p className="text-[3.8vw] md:text-[1.1vw] text-black font-light md:text-center">
              Dokumen ini berisi deskripsi CSIRT Kemhan berdasarkan RFC 2350,
              <br className="max-md:hidden" /> yaitu informasi dasar mengenai
              CSIRT Kemhan, menjelaskan tanggung jawab,
              <br className="max-md:hidden" /> layanan yang diberikan, dan cara
              untuk menghubungi CSIRT Kemhan.
            </p>
          </FadeIn>
        </div>
        <div className="flex flex-row md:gap-x-[2vw]">
          <Link href={links.id} target="_blank">
            <FadeIn direction="down" order={2.5}>
              <button className="group overflow-hidden relative bg-[#FFC600] hover:bg-[#FFD900] transition duration-500 w-[30vw] md:w-[10vw] h-[14vw] md:h-[3.6vw] rounded-[2vw] md:rounded-[0.5vw] flex flex-row md:gap-x-[1vw] justify-center items-center px-[3vw] md:px-[1.6vw] py-[0.5vw] md:py-[0.4vw] max-md:ml-[10vw]">
                <p className="text-[#012247] text-[3vw] md:text-[0.9vw] font-semibold">
                  Bahasa Indonesia
                </p>
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <HiArrowRight className="text-[#012247] size-[4vw] md:size-[2vw]" />
              </button>
            </FadeIn>
          </Link>
          <Link href={links.en} target="_blank">
            <FadeIn direction="down" order={2.5}>
              <button className="group overflow-hidden relative bg-[#FFC600] hover:bg-[#FFD900] transition duration-500 w-[30vw] md:w-[10vw] h-[14vw] md:h-[3.6vw] rounded-[2vw] md:rounded-[0.5vw] flex flex-row gap-x-[3vw] md:gap-x-[1vw] justify-center items-center px-[5vw] md:px-[1.6vw] py-[0.5vw] md:py-[0.4vw] max-md:ml-[7.5vw] z-10">
                <p className="text-[#012247] text-[3vw] md:text-[0.9vw] font-semibold">
                  English
                </p>
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <HiArrowRight className="text-[#012247] size-[3.2vw] md:size-[1.1vw]" />
              </button>
            </FadeIn>
          </Link>
        </div>

        <FadeIn
          direction="left"
          order={2}
          className="max-md:w-0 w-[27vw] aspect-[461/494] absolute left-0 bottom-0"
        >
          <Image
            src="/left_network.png"
            alt="network image"
            fill
            style={{ objectFit: "contain" }}
            draggable="false"
          />
        </FadeIn>
        <FadeIn
          direction="right"
          order={2}
          className="w-[40vw] md:w-[27vw] aspect-[477/494] absolute right-0 bottom-0 z-0"
        >
          <Image
            src="/right_network.png"
            alt="network image"
            fill
            style={{ objectFit: "contain" }}
            draggable="false"
          />
        </FadeIn>
      </div>
    </div>
  );
};

export default Rfc;
