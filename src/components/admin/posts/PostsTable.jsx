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
import { posts } from './posts';
// import PropTypes from 'prop-types';

const PostsTable = ({ limit, title }) => {
  // Sort posts in dec order based on date
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filter posts to limit
  const filteredPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;

  return (
    <div>
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
            <TableHead>
              Lihat
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((posts) => (
            <TableRow key={posts.id}>
              <TableCell>{posts.title}</TableCell>
              <TableCell className='hidden md:table-cell'>
                {posts.author}
              </TableCell>
              <TableCell className='text-right hidden md:table-cell'>
                {posts.date}
              </TableCell>
              <TableCell>
                <Link href={`/admin/artikel/edit/${posts.id}`}>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs'>
                    Edit
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;