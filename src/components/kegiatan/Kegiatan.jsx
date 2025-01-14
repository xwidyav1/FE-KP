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
import { fetchEvents } from "@/components/kegiatan/kegiatan_content"
import FadeIn from "@/components/transitions/FadeIn"
import Link from "next/link"
const BACKEND_URL = "http://localhost:8000"; // Ganti dengan URL backend Anda
export default function Kegiatan() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const getEvents = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    };

    getEvents();
  }, []);
  const rowsPerPage = 7;
  const filteredEvents = events.filter((event) =>
    event.acara.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <FadeIn className="relative w-full h-auto min-h-screen flex flex-col pt-[25vw] md:pt-[8vw] px-[5vw] md:px-[10vw] bg-[#FFFFFF]">
        <div className="flex flex-col max-md:gap-y-[1vw]">
          <FadeIn 
            direction="right"
            className="flex flex-col md:flex-row gap-x-[1vw] md:items-center">
            <div className="text-[6vw] md:text-[2.5vw] font-semibold text-[#012247]">
              Event Siber
            </div>
            <div className="w-[16vw] md:w-[8vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600]"></div>
          </FadeIn>

          {/* Search Bar */}
          <div className="md:w-[20vw] mt-[6vw] md:mt-[2vw]">
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
                      <TableCell className="border px-4 py-2">{event.acara}</TableCell>
                      <TableCell className="border px-4 py-2">{event.tanggal}</TableCell>
                      <TableCell className="border px-4 py-2">{event.tempat}</TableCell>
                    <TableCell className="border px-4 py-2">
                      {event.materi.map((materi, index) => (
                        <Link key={index} href={`${BACKEND_URL}/storage/${materi}`} target="_blank" className="text-blue-500 hover:underline block">
                          {materi}
                        </Link>
                      ))}
                    </TableCell>
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
          <div className="flex flex-row justify-end items-center w-full mt-4 gap-x-4 mr-6">
            <div className="text-black text-[3.5vw] md:text-[1vw]">
              Page {currentPage + 1} of {totalPages}
            </div>
            <div className="flex flex-row justify-between gap-x-2">
              <button 
                className="flex items-center justify-center w-[8vw] h-[8vw] text-[5vw] md:w-[2.5vw] md:h-[2.5vw] md:text-[1.7vw] bg-white border-[0.3vw] md:border-[0.1vw] border-gray-300 rounded-[1vw] md:rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
                onClick={handleFirstPage}
                disabled={currentPage === 0}
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
              <button 
                className="flex items-center justify-center w-[8vw] h-[8vw] text-[5vw] md:w-[2.5vw] md:h-[2.5vw] md:text-[1.7vw] bg-white border-[0.3vw] md:border-[0.1vw] border-gray-300 rounded-[1vw] md:rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
                onClick={handlePrevDesktop}
                disabled={currentPage === 0}
              >
                <MdKeyboardArrowLeft />
              </button>
              <button 
                className="flex items-center justify-center w-[8vw] h-[8vw] text-[5vw] md:w-[2.5vw] md:h-[2.5vw] md:text-[1.7vw] bg-white border-[0.3vw] md:border-[0.1vw] border-gray-300 rounded-[1vw] md:rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
                onClick={handleNextDesktop}
                disabled={currentPage === totalPages - 1}
              >
                <MdKeyboardArrowRight />
              </button>
              <button 
                className="flex items-center justify-center w-[8vw] h-[8vw] text-[5vw] md:w-[2.5vw] md:h-[2.5vw] md:text-[1.7vw] bg-white border-[0.3vw] md:border-[0.1vw] border-gray-300 rounded-[1vw] md:rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
                onClick={handleLastPage}
                disabled={currentPage === totalPages - 1}
              >
                <MdKeyboardDoubleArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
