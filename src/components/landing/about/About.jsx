"use client"

import { BorderBeam } from "@/components/decorations/BorderBeam";
import FadeIn from "@/components/transitions/FadeIn";
import Image from "next/image";
import React, { useState, useRef } from "react";
import YouTube from "react-youtube";

const About = () => {
  const [videoVisible, setVideoVisible] = useState(false);
  // const [videoUrl, setVideoUrl] = useState("");
  const playerRef = useRef(null);

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
    <div className="w-screen max-w-full h-auto flex flex-col px-[10vw] py-[8vw] gap-y-[10vw] bg-gradient-to-b from-[#EBEBEB] to-[#FFFFFF] overflow-x-clip">
      <div className="w-auto flex flex-col gap-y-[2.5vw]">
        <div className="w-auto flex flex-row gap-x-[2vw] justify-center items-center">
          <div className="w-[10vw] h-[0.15vw] bg-[#FFC600] place-content-center"></div>
            <h1 className="text-[2.5vw] font-bold text-[#012247]">
              Profil CSIRT Kemhan RI
            </h1>
          <div className="w-[10vw] h-[0.15vw] bg-[#FFC600] place-content-center"></div>
        </div>
        <div className="flex flex-col gap-y-[5vw]">
          <div className="w-full flex flex-col gap-y-[2vw]">
            <p className="text-[1.05vw]">
              Tim Tanggap Insiden Siber/Computer Security Inicident Response Team Kementerian Pertahanan 
              (CSIRT Kemhan) ditetapkan oleh Menteri Pertahanan melalui Keputusan Menteri Pertahanan 
              (Kepmenhan) Nomor : Kep/ 821/ M/ VII/ 2021 tentang Penetapan Tim Tanggap Insiden Siber 
              Di Lingkungan Kementerian Pertahanan. Dalam Kepmenhan tersebut, Kepala Pusat Pertahanan 
              Siber Badan Instalasi Strategis Pertahanan Kementerian Pertahanan ditunjuk sebagai Ketua 
              CSIRT Kemhan dan ditugaskan untuk melaksanakan perumusan, perencanaan, pembangunan, 
              pengoperasian, pengembangan, pengawasan, evaluasi dan anggaran terkait CSIRT Kemhan.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[1.05vw]">
              <h2>
              CSIRT Kemhan melaksanakan layanan tanggap insiden siber, berupa:
              </h2>
              <li>
                Layanan <strong>reaktif</strong>, yaitu layanan yang terkait dengan kebutuhan melakukan respon terhadap insiden siber termasuk penangkalan, penindakan, dan pemulihan siber.
              </li>
              <li>
                Layanan <strong>proaktif</strong>, yaitu layanan yang mendeteksi dan mencegah serangan siber sebelum ada dampak nyata.
              </li>
              <li>
                Layanan <strong>manajemen kualitas keamanan</strong>, yaitu layanan yang mendukung kegiatan-kegiatan reaktif dan proaktif.
              </li>
            </ul>
            <p className="text-[1.05vw]">
            CSIRT Kemhan secara resmi di-launching pada 8 Desember 2021 dan setiap pengguna sistem 
            elektronik di lingkungan Kementerian Pertahanan merupakan konstituen dari CSIRT Kemhan.
            </p>
          </div>
          <div className="relative left-[15vw] w-[50vw] aspect-[327/490] md:aspect-[7/4] bg-neutral-900 rounded-[5vw] md:rounded-[1.5vw] shadow-[0_0.52vw_2.2vw_0_rgba(0,0,0,0.25)]">
            <div className="hidden md:block relative w-full h-full rounded-[5vw] md:rounded-[1.5vw]">
              <BorderBeam size={600} duration={20} borderWidth={6} />
            </div>
            <div className="md:hidden block relative w-full h-full rounded-[5vw] md:rounded-[1.5vw]">
              <BorderBeam size={400} duration={12} borderWidth={4} />
            </div>
            
            {!videoVisible && (
              <FadeIn
                direction="right"
                order={2.5}
                className="relative -top-[80vw] md:-top-[19vw] mx-auto h-[20vw] md:h-[8vw] flex gap-x-[1vw] items-center justify-center text-white font-bold text-[3.5vw]">
                <p className="max-md:hidden">PLAY</p>
                <button
                  className="relative w-[28vw] md:w-[6vw] md:hover:scale-[1.05] transition duration-500 aspect-[120/75] "
                  onClick={togglePlay}>
                  <Image
                    src="/play.png"
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
              videoId={extractVideoId("https://www.youtube.com/watch?v=v258kj7BhA0&t=138s")}
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
        </div>
      </div>
      <div className="w-auto flex flex-col gap-y-[2.5vw]">
        <div className="w-auto flex flex-row gap-x-[2vw] justify-center items-center">
          <div className="w-[10vw] h-[0.15vw] bg-[#FFC600] place-content-center"></div>
            <h1 className="text-[2.5vw] font-bold text-[#012247]">
              Visi & Misi CSIRT Kemhan RI
            </h1>
          <div className="w-[10vw] h-[0.15vw] bg-[#FFC600] place-content-center"></div>
        </div>
        <div className="flex flex-col gap-y-[1vw]">
          <h2 className="font-semibold text-[1.5vw]">
            Visi
          </h2>    
          <p className="text-[1.05vw]">
            Terwujudnya pengelolaan sistem keamanan informasi dengan baik dan aman di Lingkungan 
            Kementerian Pertahanan untuk melindungi aset informasi yang dimiliki oleh Kementerian Pertahanan. 
          </p>
        </div> 
        <div className="flex flex-col gap-y-[1vw]">
          <h2 className="font-semibold text-[1.5vw]">
            Misi
          </h2>
          <p className="text-[1.05vw]">
            Membangun pertahanan negara yang mampu menjaga kedaulatan di ruang siber, dengan mengamankan sumber daya infrastruktur kritis pertahanan membangun tata kelola sistem informasi pertahanan yang baik.
            Membangun koordinasi, kerjasama dan kolaborasi dengan pihak terkait dan negara lain untuk membangun pertahanan siber yang tangguh.
            Menyediakan dan mengoptimalkan sumber daya pertahanan siber melalui proses pembelajaran dan peningkatan kualitas yang berkelanjutan.
          </p>
        </div>           
      </div>
    </div>
  )
}

export default About
