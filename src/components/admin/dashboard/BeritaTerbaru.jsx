"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import Link from 'next/link';
import { posts } from '../posts/posts';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BeritaTerbaru = ({ limit, title }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/latest-articles'); // Ganti endpoint sesuai kebutuhan
        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts to limit
  const filteredPosts = limit ? posts.slice(0, limit) : posts;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }


  return (
    <div className="mb-[7vw]">
      <h3 className='text-[1.7vw] mb-[1vw] font-semibold'>{title ? title : 'Berita Terbaru'}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Judul
            </TableHead>
            <TableHead className='hidden md:table-cell'>
              Kategori
            </TableHead>
            <TableHead className='hidden md:table-cell text-right'>
              Tanggal
            </TableHead>
            <TableHead className="flex justify-center items-center">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((posts) => (
            <TableRow key={posts.id}>
              <TableCell>{posts.title}</TableCell>
              <TableCell className='hidden md:table-cell'>
                {posts.category}
              </TableCell>
              <TableCell className='text-right hidden md:table-cell'>
                {posts.date}
              </TableCell>
              <TableCell className="flex justify-center items-center gap-x-[1vw]">
                <Link href={`/admin/berita/edit/${posts.id}`}>
                  <button className='w-[4vw] h-[2.5vw] bg-blue-500 hover:bg-blue-700 text-white font-semibold py-[0.5vw] px-[1.1vw] rounded text-[1vw] flex items-center justify-center'>
                    Edit
                  </button>
                </Link>
                <button className="w-[3vw] h-[2.5vw] bg-red-500 hover:bg-red-700 text-white font-bold rounded flex items-center justify-center ">
                  <Trash2 />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BeritaTerbaru;