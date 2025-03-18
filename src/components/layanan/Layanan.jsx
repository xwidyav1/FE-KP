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
import { fetchPosts } from "./pedoman_teknis"
import FadeIn from "@/components/transitions/FadeIn";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Layanan() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState({
      aduan: "",
      aduan_image: "",
      layanan: "",
      layanan_image: "",
    });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rowsPerPage = 7;
  const [filteredData, setFilteredData] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const aduanResponse = await axios.get(`${BACKEND_URL}/documents/789`);
        const layananResponse = await axios.get(`${BACKEND_URL}/documents/1234`);
        console.log("Aduan Response:", aduanResponse.data);
        console.log("Layanan Response:", layananResponse.data);
        setLoadingFetch(true);
        setData({
          aduan: aduanResponse.data.description,
          aduan_image: aduanResponse.data.file_path,
          layanan: layananResponse.data.description,
          layanan_image: layananResponse.data.file_path,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }finally {
        setLoadingFetch(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const pedoman = await fetchPosts();
        setPosts(pedoman);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  
  useEffect(() => {

    const filtered = posts.filter((post) =>
      post.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm,posts]);

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
  if (loadingFetch) return <p className="min-h-screen">Loading...</p>;
  if (loading) return <p className="min-h-screen"></p>;
  if (error) return <p className="min-h-screen flex items-center justify-center">Error: {error}</p>;;
  
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
              className="min-w-[80vw] mx-[2vw] md:mx-[1.5vw] text-[4vw] md:text-[1.2vw] text-black prose">
              <div dangerouslySetInnerHTML={{ __html: data.aduan }} />           
            </FadeIn>
            <FadeIn
              direction="top"
              order={3} 
              className="relative w-auto h-[53vw] md:h-[49vw] md:mx-[1.5vw] overflow-hidden">
              
              {data.aduan_image ? (
                <Image
                  src={data.aduan_image}
                  alt="Alur Layanan Aduan Siber"
                  fill
                  className="object-contain"
                  draggable="false"
                />
              ) : (
                <p>Gambar tidak tersedia</p>
              )}
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
              className="min-w-[80vw] mx-[2vw] md:mx-[1.5vw] text-[4vw] md:text-[1.2vw] text-black prose">
              <div dangerouslySetInnerHTML={{ __html: data.layanan }} /> 
            </FadeIn>
            <FadeIn
              direction="top"
              order={3}
              className="relative w-auto h-[81vw] md:h-[75vw] md:mx-[1.5vw] overflow-hidden">
               {data.layanan_image ? (
                <Image
                  src={data.layanan_image}
                  alt="Alur Layanan VA"
                  fill
                  className="object-contain"
                  draggable="false"
                />
              ) : (
                <p>Gambar tidak tersedia</p>
              )}
            </FadeIn>
          </FadeIn>
        </div>
        
        <div id="posts" className="flex flex-col min-h-screen">
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
                  currentData.map((post, index) => (
                    <TableRow
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-gray-100' : ''
                      } hover:bg-blue-100`}
                    >
                      <TableCell className="border px-4 py-2 text-blue-600">
                      <a 
                        href={`http://localhost:8000/storage/${post.file_path}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline">
                        {post.name}
                      </a>
                      </TableCell>
                      <TableCell className="border px-4 py-2">{post.size}</TableCell>
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
