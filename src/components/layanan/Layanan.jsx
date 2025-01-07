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

export default function Layanan() {
  // State untuk mengontrol mounting komponen
  const [isMounted, setIsMounted] = useState(false);

  // State lainnya
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const rowsPerPage = 7;
  const filteredGuides = guides.filter((guide) =>
    guide.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredGuides.length / rowsPerPage);

  // Data untuk halaman saat ini
  const currentData = filteredGuides.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handleFirstPage = () => setCurrentPage(0);
  const handlePrevDesktop = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNextDesktop = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handleLastPage = () => setCurrentPage(totalPages - 1);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset ke halaman pertama saat melakukan pencarian
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full h-auto flex flex-col pt-[6vw] px-[10vw] bg-gradient-to-b from-[#EBEBEB] to-[#FFFFFF]">
      <div className="w-[80vw] md:w-[60vw] aspect-[1748/2424] absolute right-[-17vw] md:right-[-28vw] top-[-28vw] md:top-[-33vw] z-0">
        <Image
          src="/right_neural.png"
          alt="network image"
          fill
          style={{ objectFit: "contain" }}
          draggable="false"
        />
      </div>
      <div className="flex flex-col h-[40vw] text-center items-center justify-center text-[#012247] gap-y-[6vw] mb-[8vw] z-10">
        <p className="text-[3vw]">
          "You can&apos;t defend. You can&apos;t prevent. 
          <br className="max-md:hidden" /> The only thing you can do is detect and respond."
        </p>
        <p className="text-[1.5vw]">
          Bruce Schneier, Renowned Security Technologist
        </p>
      </div>
      <div className="flex flex-col gap-y-[8vw]">
        <div className="flex flex-col gap-y-[2vw]">
          <div className="flex flex-row gap-x-[1vw] items-center">
            <div className="text-[2vw] font-semibold text-[#012247]">
              Aduan Siber
            </div>
            <div className="w-[10vw] h-[0.15vw] bg-[#FFC600]">        
            </div>
          </div>
          <div>
          Berdasarkan Peraturan Menteri Pertahanan Nomor 14 Tahun 2019 tentang Organisasi 
          dan Tata Kerja Kementerian Pertahanan, Pusat Pertahanan Siber Bainstrahan Kemhan 
          (Pushansiber) mempunyai   tugas   melaksanakan   penyiapan operasi  siber  
          meliputi  pemantauan,  analisis  dan  pelaporan ancaman  siber,  penindakan,  
          digital  forensik  dan  pemulihan serta pembentukan Computer Emergency Response Team (CERT)
          <br className="max-md:hidden" /> Prosedur Aduan Siber
          <br className="max-md:hidden" />1.  Penerimaan aduan insiden siber melalui telepon 021-75918947 atau surel csirt@kemhan.go.id.
          <br className="max-md:hidden" />2.  Pencatatan aduan insiden siber baik identitas pelapor disertai data dukung dan bukti terjadinya insiden siber.
          <br className="max-md:hidden" />3.  Notifikasi penerimaan aduan insiden siber.
          <br className="max-md:hidden" />4.  Verifikasi aduan insiden siber.
          <br className="max-md:hidden" />5.  Observasi dan investigasi aduan insiden siber.
          <br className="max-md:hidden" />6.  Pemberian rekomendasi cara penanggulanangan insiden siber.
          <br className="max-md:hidden" />7.  Jika administrator IT/pemilik aset tidak dapat menyelesaikan insiden siber dapat meminta BSSN untuk dapat membantu menindaklanjuti aduan insiden siber
          </div>
          <div className="relative w-full h-[49vw] overflow-hidden">
            <Image
              src="/aduan-siber.png"
              alt="Alur Layanan Aduan Siber"
              fill
              className="object-cover"
              draggable="false"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-[2vw]">
          <div className="flex flex-row gap-x-[1vw] items-center">
            <div className="text-[2vw] font-semibold text-[#012247]">
              Layanan Vulnerability Asesment
            </div>
            <div className="w-[10vw] h-[0.15vw] bg-[#FFC600]">        
            </div>
          </div>
          <div className="list-disc list-inside space-y-2">
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
          </div>
          <div className="relative w-full h-[75vw] overflow-hidden">
            <Image
              src="/layanan-va.jpg"
              alt="Alur Layanan VA"
              fill
              className="object-cover"
              draggable="false"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-[1vw] items-center">
            <div className="text-[2vw] font-semibold text-[#012247]">
              Pedoman Teknis
            </div>
            <div className="w-[10vw] h-[0.15vw] bg-[#FFC600]"></div>
          </div>

          {/* Search Bar */}
          <div className="w-[20vw] mt-[2vw]">
            <input
              type="text"
              placeholder="Cari nama panduan..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          <div className="h-auto mt-[1vw] mb-[13vw]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#012247] pointer-events-none">
                <TableHead className="text-white">Nama Panduan</TableHead>
                <TableHead className="text-white">Ukuran File</TableHead>
              </TableRow>
            </TableHeader>
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
          </Table>

          {/* Pagination Controls */}
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
          </div>
        </div>
      </div>
    </div>
  )
}
