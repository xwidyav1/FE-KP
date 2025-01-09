import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { guides } from '@/components/admin/dokumen/data_pedoman_teknis';
import { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const PedomanTeknis = ({ limit, title }) => {
  const itemsPerPage = 5; // Jumlah item per halaman
  const [currentPage, setCurrentPage] = useState(1);

  // Sort guides in descending order based on date
  const sortedGuides = [...guides].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate total pages
  const totalPages = Math.ceil(sortedGuides.length / itemsPerPage);

  // Get guides for the current page
  const paginatedGuides = sortedGuides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page navigation
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="mb-[7vw]">
      <h3 className="text-[1.7vw] mb-[1vw] font-semibold">{title || 'Pedoman Teknis'}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead className="text-right">Ukuran File</TableHead>
            <TableHead className="text-center">Dokumen</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedGuides.map((guide) => (
            <TableRow key={guide.id}>
              <TableCell>{guide.name}</TableCell>
              <TableCell className="text-right">{guide.size}</TableCell>
              <TableCell className="text-center">
                <Link href={guide.dokumen} target="_blank" className="text-blue-500 hover:underline">
                  Lihat Dokumen
                </Link>
              </TableCell>
              <TableCell className="flex justify-center items-center gap-x-[1vw]">
                <Link href={`/admin/dokumen/guides/edit/${guide.id}`}>
                  <button className="w-[4vw] h-[2.5vw] bg-blue-500 hover:bg-blue-700 text-white font-semibold py-[0.5vw] px-[1.1vw] rounded text-[1vw] flex items-center justify-center">
                    Edit
                  </button>
                </Link>
                <button className="w-[3vw] h-[2.5vw] bg-red-500 hover:bg-red-700 text-white font-bold rounded flex items-center justify-center">
                  <Trash2 />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Navigasi */}
      <div className="max-md:hidden flex flex-row justify-end items-center w-full mt-[2vw] gap-x-[2vw] pr-[3vw]">
        <div className="text-black text-[1vw]">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex flex-row justify-between gap-x-[0.5vw]">
          <button 
            href="#tabel"
            className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}>
            <MdKeyboardDoubleArrowLeft />
          </button>
          <button 
            href="#tabel"
            className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}>
            <MdKeyboardArrowLeft />  
          </button>
          <button
            href="#tabel"
            className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}>
            <MdKeyboardArrowRight />
          </button>
          <button
            href="#tabel" 
            className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}>
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedomanTeknis;
