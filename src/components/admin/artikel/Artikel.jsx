import React from 'react'
import PostsTable from "@/components/admin/posts/PostsTable"
import BackButton from "@/components/admin/BackButton";
import ArtikelPagination from '@/components/admin/artikel/ArtikelPagination';

const artikel = () => {
  return (
    <div>
      <BackButton text="Kembali" link="/admin" />
      <div className="flex flex-col gap-y-[1vw]">
        <PostsTable />
        <ArtikelPagination />
      </div>     
    </div>
  )
};

export default artikel;
