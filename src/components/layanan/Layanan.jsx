"use client"

import { useState, useEffect }from 'react'
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  MdKeyboardDoubleArrowLeft, 
  MdKeyboardArrowLeft, 
  MdKeyboardArrowRight, 
  MdKeyboardDoubleArrowRight 
} from "react-icons/md";
import { guides } from "./pedoman_teknis"
import FadeIn from "@/components/transitions/FadeIn";

export default function Layanan() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const rowsPerPage = 7;
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = guides.filter((guide) =>
      guide.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Data untuk halaman saat ini
  const currentData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const handleFirstPage = () => setCurrentPage(0);
  const handlePrevDesktop = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNextDesktop = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handleLastPage = () => setCurrentPage(totalPages - 1);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset ke halaman pertama saat melakukan pencarian
  };

  return (
    <div className="relative w-full h-auto flex flex-col pt-[6vw] px-[5vw] md:px-[10vw] bg-gradient-to-b from-[#EBEBEB] to-[#FFFFFF]">
      <FadeIn
        direction="left"
        className="w-[120vw] md:w-[60vw] aspect-[1748/2424] absolute right-[-55vw] md:right-[-28vw] top-[-60vw] md:top-[-33vw] z-0">
        <Image
          src="/right_neural.png"
          alt="network image"
          fill
          className="object-contain"
          draggable="false"
        />
      </FadeIn>
      <div className="flex flex-col h-[180vw] md:h-[40vw] text-center items-center justify-center text-[#012247] gap-y-[15vw] md:gap-y-[6vw] mb-[0vw] z-10">
        <FadeIn 
          direction="right"
          className="text-[6.5vw] md:text-[3vw]">
          &quot;You can&apos;t defend. You can&apos;t prevent. 
          <br className="max-md:hidden" /> The only thing you can do is detect and respond.&quot;
        </FadeIn>
        <FadeIn 
          direction="left"
          className="text-[3vw] md:text-[1.5vw]">
          Bruce Schneier, Renowned Security Technologist
        </FadeIn>
      </div>
      <div className="flex flex-col gap-y-[0vw]">
        <div id="aduansiber">
          <FadeIn className="flex flex-col gap-y-[7vw] md:gap-y-[2vw] max-md:mb-[20vw]">
            <FadeIn 
              direction="right"
              order={2}
              className="flex justify-start items-end h-[12vw]">
              <div className="flex flex-col md:flex-row gap-x-[1vw] md:items-center">
                <div className="text-[6vw] md:text-[2.5vw] font-semibold text-[#012247]">
                  Aduan Siber
                </div>
                <div className="w-[16vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600]">        
                </div>
              </div>
            </FadeIn>
            <FadeIn
              direction="top"
              order={3}
              className="mx-[2vw] md:mx-[1.5vw] text-[4vw] md:text-[1.1vw]">
              Berdasarkan Peraturan Menteri Pertahanan Nomor 14 Tahun 2019 tentang Organisasi 
              dan Tata Kerja Kementerian Pertahanan, Pusat Pertahanan Siber Bainstrahan Kemhan 
              (Pushansiber) mempunyai   tugas   melaksanakan   penyiapan operasi  siber  
              meliputi  pemantauan,  analisis  dan  pelaporan ancaman  siber,  penindakan,  
              digital  forensik  dan  pemulihan serta pembentukan Computer Emergency Response Team (CERT)
              <br/> Prosedur Aduan Siber
              <br />1.  Penerimaan aduan insiden siber melalui telepon 021-75918947 atau surel csirt@kemhan.go.id.
              <br />2.  Pencatatan aduan insiden siber baik identitas pelapor disertai data dukung dan bukti terjadinya insiden siber.
              <br />3.  Notifikasi penerimaan aduan insiden siber.
              <br />4.  Verifikasi aduan insiden siber.
              <br />5.  Observasi dan investigasi aduan insiden siber.
              <br />6.  Pemberian rekomendasi cara penanggulanangan insiden siber.
              <br />7.  Jika administrator IT/pemilik aset tidak dapat menyelesaikan insiden siber dapat meminta BSSN untuk dapat membantu menindaklanjuti aduan insiden siber
            </FadeIn>
            <FadeIn
              direction="top"
              order={3} 
              className="relative w-auto h-[53vw] md:h-[49vw] md:mx-[1.5vw] overflow-hidden">
              <Image
                src="/aduan-siber.png"
                alt="Alur Layanan Aduan Siber"
                fill
                className="object-contain"
                draggable="false"
              />
            </FadeIn>
          </FadeIn>
        </div>      
        <div id="layananva">
          <FadeIn className="flex flex-col gap-y-[7vw] md:gap-y-[2vw] max-md:mb-[20vw]">
            <FadeIn 
              direction="right"
              order={2}
              className="flex justify-start items-end h-[12vw]">
              <div className="flex flex-col md:flex-row md:gap-x-[1vw] md:items-center">
                <div className="text-[6vw] md:text-[2.5vw] font-semibold text-[#012247]">
                  Layanan VA
                </div>
                <div className="w-[16vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600]">        
                </div>
              </div>
            </FadeIn>
            <FadeIn 
              direction="top"
              order={3}
              className="list-disc list-inside space-y-2 text-[4vw] md:text-[1.1vw] mx-[2vw] md:mx-[1.5vw]">
              <p>
                Layanan Vulnerability Assesment (VA) dikhusukan bagi konstituen CSIRT Kemhan yaitu Satker/Sub Satker di Lingkungan Kementerian Pertahanan. Adapun informasi yang perlu disiapkan untuk pengajuan layanan ini adalah :
              </p>
              <li>Nama Aplikasi/Website yang akan di VA</li>
              <li>PIC aplikasi/website (No. HP & Email)</li>
              <li>Target IP/Domain</li>
              <li>Upload surat permohonan dari satker kepada Pushansiber </li>
              <li>Target IP/Domain </li>
              <li>Upload surat permohonan dari satker kepada Pushansiber</li> 
              <p>
                Berikut Alur Layanan VA :
              </p>
            </FadeIn>
            <FadeIn
              direction="top"
              order={3}
              className="relative w-auto h-[81vw] md:h-[75vw] md:mx-[1.5vw] overflow-hidden">
              <Image
                src="/layanan-va.jpg"
                alt="Alur Layanan VA"
                fill
                className="object-contain"
                draggable="false"
              />
            </FadeIn>
          </FadeIn>
        </div>
        
        <div id="guides" className="flex flex-col min-h-screen">
          <FadeIn 
            direction="right"
            className="flex justify-start items-end max-md:mb-[5vw] h-[12vw]">
            <div className="flex flex-col md:flex-row gap-x-[1vw] md:items-center">
              <div className="text-[6vw] md:text-[2.5vw] font-semibold text-[#012247]">
                Pedoman Teknis
              </div>
              <div className="w-[16vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600]">        
              </div>
            </div>
          </FadeIn>

          {/* Search Bar */}
          {isClient && (
            <div className="md:w-[20vw] mt-[2vw]">
              <input
                type="text"
                placeholder="Cari nama pedoman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>
          )}

          <div className="h-auto mt-[1vw] mb-[13vw]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#012247] pointer-events-none">
                <TableHead className="text-white">Nama Panduan</TableHead>
                <TableHead className="text-white">Ukuran File</TableHead>
              </TableRow>
            </TableHeader>
            {isClient ? (
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((guide, index) => (
                    <TableRow
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-gray-100' : ''
                      } hover:bg-blue-100`}
                    >
                      <TableCell className="border px-4 py-2 text-blue-600">
                        <a href="#" className="hover:underline">
                          {guide.name}
                        </a>
                      </TableCell>
                      <TableCell className="border px-4 py-2">{guide.size}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-4">
                      Tidak ada hasil yang sesuai.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>

          {/* Pagination Controls */}
          {isClient && totalPages > 1 && (
            <div className="max-md:hidden flex flex-row justify-end items-center w-full mt-4 gap-x-4 mr-6">
              <div className="text-black text-sm">
                Page {currentPage + 1} of {totalPages}
              </div>
              <div className="flex flex-row justify-between gap-x-2">
                <button 
                  className="flex items-center justify-center w-10 h-10 text-lg border border-gray-300 rounded-lg disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
                  onClick={handleFirstPage}
                  disabled={currentPage === 0}
                >
                  <MdKeyboardDoubleArrowLeft />
                </button>
                <button 
                  className="flex items-center justify-center w-10 h-10 text-lg border border-gray-300 rounded-lg disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
                  onClick={handlePrevDesktop}
                  disabled={currentPage === 0}
                >
                  <MdKeyboardArrowLeft />
                </button>
                <button 
                  className="flex items-center justify-center w-10 h-10 text-lg border border-gray-300 rounded-lg disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
                  onClick={handleNextDesktop}
                  disabled={currentPage === totalPages - 1}
                >
                  <MdKeyboardArrowRight />
                </button>
                <button 
                  className="flex items-center justify-center w-10 h-10 text-lg border border-gray-300 rounded-lg disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
                  onClick={handleLastPage}
                  disabled={currentPage === totalPages - 1}
                >
                  <MdKeyboardDoubleArrowRight />
                </button>
              </div>
            </div>
          )}     
          </div>
        </div>
      </div>
    </div>
  )
}
