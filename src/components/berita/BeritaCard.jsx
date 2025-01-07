import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from 'lucide-react';

const BeritaCard = ({ value }) => {
  return (
    <>
      <div className="flex flex-row gap-x-[1vw] m-[1.5vw]">
        <div className="relative w-[80vw] md:w-[18.5vw] max-h-[10.5vw] aspect-[16/9] md:mx-[0vw]">
          <Image
            src={value.image}
            alt={value.title}
            fill
            style={{ objectFit: "cover" }}
            draggable="false"
          />
        </div>
        <div className="flex flex-col w-[19.9vw] gap-y-[0.4vw]">
          <Link 
            href="/"
            className="w-fit text-[1vw] text-[#012247] hover:underline">
            {value.kategori}
          </Link>
          <Link 
            href={`/artikel/${value.slug}`}
            className="w-fit font-semibold text-[1.4vw] line-clamp-2 text-[#012247] hover:underline">
            {value.title}
          </Link>
          <div className="flex gap-x-[0.5vw]">
            <CalendarDays className="size-[1.3vw] text-[#FFC600]" />
            <p className="text-[0.9vw] text-gray-500">
            {value.date}
          </p>
          </div>         
          <p className="text-[1vw] overflow-hidden text-ellipsis whitespace-normal max-h-[12vw]">
            {value.content}
          </p>
        </div>
      </div>
    </>
  )
}

export default BeritaCard
