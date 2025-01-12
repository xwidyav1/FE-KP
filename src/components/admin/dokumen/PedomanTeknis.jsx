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
import { fetchPosts } from '@/components/admin/dokumen/data_pedoman_teknis';
import { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const BACKEND_URL = 'http://localhost:8000'; 
const PedomanTeknis = ({ description }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  // Sort guides in descending order based on date
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  // Calculate total pages
  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage);

  // Get guides for the current page
  const paginatedGuides = sortedPosts.slice(
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
          {paginatedGuides.map((posts) => (
            <TableRow key={posts.id}>
              <TableCell>{posts.name}</TableCell>
              <TableCell className="text-right">{posts.size}</TableCell>
              <TableCell className="text-center">
                <Link href={`${BACKEND_URL}/storage/${posts.documents}`} target="_blank" className="text-blue-500 hover:underline">
                  Lihat Dokumen
                </Link>
              </TableCell>
              <TableCell className="flex justify-center items-center gap-x-[1vw]">
                <Link href={`/admin/dokumen/guides/edit/${posts.id}`}>
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
