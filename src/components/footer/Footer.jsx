import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { House, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <div className="w-full h-[30vw] flex flex-col">
      <div className="flex flex-row h-[25.5vw] pt-[5vw] px-[7vw] gap-x-[6vw] bg-gradient-to-b from-[#083D62] to-[#012247] text-white">
        <div className="w-[17vw] flex flex-col gap-y-[2vw]">
          <div className="relative w-[13vw] aspect-[2114/579]">
            <Image
              src="/logo-csirt-kemhan.png"
              alt="logo CSIRT Kemhan"
              fill
              style={{ objectFit: "contain" }}
              draggable="false"
            />
          </div>
          <p className="w-[14vw] text-[0.9vw]">
            Tim Penanganan Insiden Keamanan Siber Pusat Pertahanan Siber
            Badan instalasi Strategis Pertahanan
            Kementerian Pertahanan Republik Indonesia
          </p>   
          <div className="flex flex-row w-[12vw] gap-x-[2vw] justify-center items-center">           
            <div>
              <a 
              target="_blank" 
              href="https://www.facebook.com/UGMYogyakarta/"
              rel="noopener noreferrer">             
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512" 
                width="2vw" 
                height="2vw" 
                fill="#ffffff"
                className="hover:fill-[#FFC600] transition-all duration-300">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                </svg>
              </a>
            </div>
            <div>
              <a 
                target="_blank" 
                href="https://www.instagram.com/ugm.yogyakarta" 
                rel="noopener noreferrer">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="2.3vw" 
                  height="2.3vw" 
                  fill="#ffffff" 
                  viewBox="0 0 256 256"
                  className="hover:fill-[#FFC600] transition-all duration-300">
                  <path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM128,176a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176Zm60-96a12,12,0,1,1,12-12A12,12,0,0,1,188,80Zm-28,48a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z"></path>
                </svg>
              </a>
            </div>
            <div>
              <a 
              target="_blank" 
              href="https://twitter.com/UGMYogyakarta/" 
              rel="noopener noreferrer">
                <svg 
                  width="2vw" 
                  height="2vw" 
                  viewBox="0 0 20 20" 
                  fill="#ffffff" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="hover:fill-[#FFC600] transition-all duration-300">
                  <path d="M11.6175 8.66L17.9463 1.25H16.4463L10.9525 7.68375L6.5625 1.25H1.5L8.1375 10.98L1.5 18.75H3L8.8025 11.955L13.4388 18.75H18.5013L11.6175 8.66ZM9.56375 11.065L8.89125 10.0962L3.54 2.3875H5.84375L10.1613 8.60875L10.8338 9.5775L16.4475 17.665H14.1438L9.56375 11.065Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[10vw] gap-y-[2vw]">
          <div className="text-[1.2vw] font-semibold">
            Peta Situs
          </div>
          <div className="flex flex-col gap-y-[0.5vw] ml-[0.5vw] text-[1vw]">
            <Link
              href="/"
              className="relative md:w-[4.3vw] gap-x-[0.4vw] text-sm-vw-mb md:text-xl-vw font-light group max-md:underline hover:text-[#FFC600] transition-all duration-300">
              Beranda
              <span className="max-md:hidden absolute bottom-0 left-0 w-full h-[0.1vw] bg-[#FFC600] origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/"
              className="relative md:w-[2.5vw] gap-x-[0.4vw] text-sm-vw-mb md:text-xl-vw font-light group max-md:underline hover:text-[#FFC600] transition-all duration-300">
              Profil
              <span className="max-md:hidden absolute bottom-0 left-0 w-full h-[0.1vw] bg-[#FFC600] origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/"
              className="relative md:w-[3.9vw] gap-x-[0.4vw] text-sm-vw-mb md:text-xl-vw font-light group max-md:underline hover:text-[#FFC600] transition-all duration-300">
              Visi Misi
              <span className="max-md:hidden absolute bottom-0 left-0 w-full h-[0.1vw] bg-[#FFC600] origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/"
              className="relative md:w-[2.9vw] gap-x-[0.4vw] text-sm-vw-mb md:text-xl-vw font-light group max-md:underline hover:text-[#FFC600] transition-all duration-300">
              Berita
              <span className="max-md:hidden absolute bottom-0 left-0 w-full h-[0.1vw] bg-[#FFC600] origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/"
              className="relative md:w-[3vw] gap-x-[0.4vw] text-sm-vw-mb md:text-xl-vw font-light group max-md:underline hover:text-[#FFC600] transition-all duration-300">
              Galeri
              <span className="max-md:hidden absolute bottom-0 left-0 w-full h-[0.1vw] bg-[#FFC600] origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/"
              className="relative md:w-[1.8vw] gap-x-[0.4vw] text-sm-vw-mb md:text-xl-vw font-light group max-md:underline hover:text-[#FFC600] transition-all duration-300">
              RFC
              <span className="max-md:hidden absolute bottom-0 left-0 w-full h-[0.1vw] bg-[#FFC600] origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-[12vw] gap-y-[2vw]">
          <div className="text-[1.2vw] font-semibold">
            Dukungan
          </div>        
          <div className="flex flex-col gap-y-[0.5vw] ml-[0.5vw] text-[1vw]">
            <Link
              href="/layanan"
              className="relative md:w-[6.2vw] gap-x-[0.4vw] text-sm-vw-mb md:text-xl-vw font-light group max-md:underline hover:text-[#FFC600] transition-all duration-300">
              Aduan Siber
              <span className="max-md:hidden absolute bottom-0 left-0 w-full h-[0.1vw] bg-[#FFC600] origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/layanan"
              className="relative md:w-[6vw] gap-x-[0.4vw] text-sm-vw-mb md:text-xl-vw font-light group max-md:underline hover:text-[#FFC600] transition-all duration-300">
              Layanan VA
              <span className="max-md:hidden absolute bottom-0 left-0 w-full h-[0.1vw] bg-[#FFC600] origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/layanan"
              className="relative md:w-[8.3vw] gap-x-[0.4vw] text-sm-vw-mb md:text-xl-vw font-light group max-md:underline hover:text-[#FFC600] transition-all duration-300">
              Pedoman Teknis
              <span className="max-md:hidden absolute bottom-0 left-0 w-full h-[0.1vw] bg-[#FFC600] origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-[30vw] gap-y-[2vw]">
          <div className="text-[1.2vw] font-semibold">
            Kontak
          </div>
          <div className="flex flex-col gap-y-[1vw] text-[1vw]"> 
            <div className="flex flex-row gap-x-[1vw]">             
              <House style={{ width: '4.5vw', height: '2vw', color: "#FFC600" }} />             
              <p>
              Gedung Sutan Sjahrir (Pushansiber) Jalan Pondok Labu Raya, 
              RT.6/RW.6, Pd. Labu, Kec. Cilandak, Kota Jakarta Selatan, 
              Daerah Khusus Ibukota Jakarta 12450
              </p>
            </div>
            <div className="flex flex-row gap-x-[2.3vw]">
              <div className="flex flex-row gap-x-[1vw]">
                <Phone style={{ width: '1.5vw', height: '1.5vw', color: "#FFC600" }} />
                <p>
                  (+62) 21 2977 000 1
                </p>
              </div>
              <div className="flex flex-row gap-x-[1vw]">
                <Mail style={{ width: '1.5vw', height: '1.5vw', color: "#FFC600" }} />
                <div className="flex flex-col">
                  <p>
                    csirt@kemhan.go.id
                  </p>
                  <p>
                    cs.csirt@kemhan.go.id
                  </p>
                </div>
              </div>
            </div>
            <div>
              Silahkan gunakan PGP untuk komunikasi e-mail terenkripsi.
              PGP Key dapat diunduh di <a href="https://csirt.kemhan.go.id/assets/CSIRT-Kemhan_0xAD591C54_public.asc" className="text-[#FFC600] hover:text-[#FFB300]">sini</a>.
            </div>
          </div>
        </div>
      </div>
      <div className="h-[4.5vw] flex justify-center items-center bg-[#012247] text-white text-[0.9vw]">
        Copyright 2024© Pushansiber Kemhan RI
      </div>
    </div>
  )
}
