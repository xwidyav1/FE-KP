"use client";

import { BorderBeam } from "@/components/decorations/BorderBeam";
import FadeIn from "@/components/transitions/FadeIn";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";

const About = () => {
  const [videoVisible, setVideoVisible] = useState(false);
  const [data, setData] = useState({
    profil: "",
    visi: "",
    misi: "",
    videoUrl: "",
  });
  const playerRef = useRef(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profilResponse = await axios.get("http://localhost:8000/artikel/1122");
        const visiResponse = await axios.get("http://localhost:8000/artikel/2233");
        const misiResponse = await axios.get("http://localhost:8000/artikel/3456");

        setData({
          profil: profilResponse.data.content,
          visi: visiResponse.data.content,
          misi: misiResponse.data.content,
          videoUrl: profilResponse.data.link_video, // Assume `videoUrl` is part of profilResponse
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const togglePlay = () => {
    setVideoVisible(true);
    playerRef.current.playVideo();
  };

  const extractVideoId = (url) => {
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)|youtu\.be\/([^?&]+)/;
    const match = url.match(urlPattern);
    return match ? match[1] || match[2] : null;
  };

  return (
    <div id="about" className="w-screen max-w-full h-auto flex flex-col px-[5vw] md:px-[10vw] py-[20vw] md:py-[8vw] gap-y-[10vw] md:gap-y-[0vw] bg-gradient-to-b from-[#EBEBEB] to-[#FFFFFF] overflow-x-clip">
      <FadeIn direction="top" order={1} className="w-auto flex flex-col gap-y-[10vw] md:gap-y-[4vw]">
        <div className="w-auto flex flex-col md:flex-row max-md:gap-y-[1vw] md:gap-x-[2vw] md:justify-center md:items-center">
          <div className="max-md:hidden w-[10vw] h-[0.15vw] bg-[#FFC600] place-content-center"></div>
          <h1 className="text-[6vw] md:text-[2.5vw] font-bold text-[#012247]">
            Profil CSIRT Kemhan RI
          </h1>
          <div className="w-[16vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600] place-content-center"></div>
        </div>
        <FadeIn direction="top" order={2} className="flex flex-col gap-y-[5vw] max-md:px-[3vw]">
          <div className="w-full flex flex-col gap-y-[2vw]">
            <p className="text-[3.5vw] md:text-[1.05vw]">{data.profil}</p>
          </div>
          <div className="relative md:left-[15vw] w-[84vw] md:w-[50vw] aspect-[16/9] md:aspect-[7/4] bg-neutral-900 rounded-[3vw] md:rounded-[1.5vw] shadow-[0_0.52vw_2.2vw_0_rgba(0,0,0,0.25)]">
            <div className="max-md:hidden relative w-full h-full rounded-[3vw] md:rounded-[1.5vw]">
              <BorderBeam size={600} duration={20} borderWidth={6} />
            </div>

            {!videoVisible && (
              <FadeIn
                direction="right"
                order={2.5}
                className="relative top-[12.5vw] md:-top-[19vw] md:mx-auto h-[20vw] md:h-[8vw] flex gap-x-[1vw] items-center justify-center text-white font-bold text-[3.5vw]">
                <p className="max-md:hidden">PLAY</p>
                <button
                  className="relative w-[20vw] md:w-[6vw] md:hover:scale-[1.05] transition duration-500 aspect-[120/75] "
                  onClick={togglePlay}>
                  <Image
                    src="/play_video_button.png"
                    alt="play button"
                    fill
                    style={{ objectFit: "contain" }}
                    draggable="false"
                  />
                </button>
                <p className="max-md:hidden">VIDEO</p>
              </FadeIn>
            )}
            <YouTube
              videoId={extractVideoId(data.videoUrl)}
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  autoplay: 0,
                  controls: 1,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 1,
                  fs: 1,
                  cc_load_policy: 1,
                  iv_load_policy: 3,
                },
              }}
              onReady={onReady}
              className={`absolute top-0 left-0 w-full h-full ${
                videoVisible ? "opacity-100 z-10" : "opacity-0 -z-10"
              }`}
            />
          </div>
        </FadeIn>
      </FadeIn>
      <div id="visimisi">
        <FadeIn direction="top" order={1} className="md:w-auto flex flex-col gap-y-[10vw] md:gap-y-[4vw] md:mt-[2vw]">
          <div className="h-[30vw] md:h-[12vw] flex items-end md:justify-center">
            <div className="w-auto h-auto flex flex-col md:flex-row max-md:gap-y-[1vw] gap-x-[2vw] justify-center md:items-center">
              <div className="max-md:hidden w-[10vw] h-[0.15vw] bg-[#FFC600] place-content-center"></div>
              <h1 className="text-[6vw] md:text-[2.5vw] font-bold text-[#012247]">
                Visi & Misi CSIRT Kemhan RI
              </h1>
              <div className="w-[16vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600] place-content-center"></div>
            </div>
          </div>

          <FadeIn direction="top" order={2} className="flex flex-col gap-y-[1vw] max-md:px-[3vw]">
            <h2 className="font-semibold text-[4.5vw] md:text-[1.5vw]">Visi</h2>
            <p className="text-[3.8vw] md:text-[1.05vw]">{data.visi}</p>
          </FadeIn>
          <FadeIn direction="top" order={2} className="flex flex-col gap-y-[1vw] max-md:px-[3vw]">
            <h2 className="font-semibold text-[4.5vw] md:text-[1.5vw]">Misi</h2>
            <p className="text-[3.8vw] md:text-[1.05vw]">{data.misi}</p>
          </FadeIn>
        </FadeIn>
      </div>
    </div>
  );
};

export default About;
