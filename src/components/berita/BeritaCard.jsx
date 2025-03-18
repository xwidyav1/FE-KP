import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const BeritaCard = ({ post }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-x-[1vw] md:m-[1.5vw]">
        <Link 
          href={`/artikel/${post.slug}`}
          className="relative w-full md:w-[18.5vw] max-h-[50vw] md:max-h-[10.5vw] aspect-[16/9] md:mx-[0vw]">
          <Image
            src={`${BACKEND_URL}/api/storage/${post.image}`}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            draggable="false"
          />
        </Link>
        <div className="flex flex-col w-full md:w-[19.9vw] gap-y-[2vw] md:gap-y-[0.4vw] max-md:p-[3vw]">
          <p 
            className="w-fit text-[3.5vw] md:text-[1vw] text-[#012247]">
            {post.category}
          </p>
          <Link 
            href={`/artikel/${post.slug}`}
            className="w-fit font-semibold text-[5.5vw] md:text-[1.4vw] line-clamp-2 max-md:leading-[6.5vw] text-[#012247] hover:underline">
            {post.title}
          </Link>
          <div className="flex gap-x-[1vw] md:gap-x-[0.5vw]">
            <CalendarDays className="size-[4vw] md:size-[1.3vw] text-[#FFC600]" />
            <p className="text-[3vw] md:text-[0.9vw] text-gray-500">
            {post.updated_at}
          </p>
          </div>         
          <div
            className="text-[4vw] md:text-[1vw] overflow-hidden text-ellipsis whitespace-normal max-h-[49vw] md:max-h-[12vw] prose-xl"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </div>
    </>
  )
}

export default BeritaCard
