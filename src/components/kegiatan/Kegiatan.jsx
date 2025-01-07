"use client"

import { useState, useEffect }from 'react'
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
import { events } from "./kegiatan_content"

export default function Kegiatan() {
  // State untuk mengontrol mounting komponen
  const [isMounted, setIsMounted] = useState(false);

  // State lainnya
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const rowsPerPage = 7;
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredEvents.length / rowsPerPage);

  // Data untuk halaman saat ini
  const currentData = filteredEvents.slice(
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
    <div className="relative w-full h-auto flex flex-col pt-[8vw] px-[10vw] bg-[#FFFFFF]">
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-[1vw] items-center">
            <div className="text-[2.5vw] font-semibold text-[#012247]">
              Event Siber
            </div>
            <div className="w-[8vw] h-[0.15vw] bg-[#FFC600]"></div>
          </div>

          {/* Search Bar */}
          <div className="w-[20vw] mt-[2vw]">
            <input
              type="text"
              placeholder="Cari kegiatan ..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          <div className="h-auto mt-[1vw] mb-[13vw]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#012247] pointer-events-none">
                <TableHead className="text-white">Acara</TableHead>
                <TableHead className="text-white">Tanggal</TableHead>
                <TableHead className="text-white">Tempat</TableHead>
                <TableHead className="text-white">Materi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((event, index) => (
                    <TableRow
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-gray-100' : ''
                      } hover:bg-blue-100`}
                    >
                      <TableCell className="border px-4 py-2">{event.name}</TableCell>
                      <TableCell className="border px-4 py-2">{event.date}</TableCell>
                      <TableCell className="border px-4 py-2">{event.place}</TableCell>
                      <TableCell className="border px-4 py-2">{event.materi}</TableCell>
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
  )
}
