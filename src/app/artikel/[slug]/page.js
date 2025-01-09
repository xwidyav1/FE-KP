"use client"

import { use, useEffect, useState } from 'react';
import { berita } from '@/components/berita/berita_content';
import Navbar from '@/components/berita/Navbar';
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import { CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function NewsDetail({ params }) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const { slug } = use(params);

  const latestNews = [...berita]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 5);

  useEffect(() => {
    const currentArticle = berita.find(item => item.slug === slug);
    if (!currentArticle) {
      router.push('/berita/1'); // Redirect to news listing if article not found
      return;
    }
    setArticle(currentArticle);
  }, [slug, router]);

  if (!article) {
    return <div className="">Loading...</div>;
  }

  return (
    <div className="relative h-fit overflow-hidden">
      <Navbar />
      <div className="flex flex-row px-[5vw] md:px-[10vw] my-[8vw] gap-x-[3vw]">
        <div className="w-[55vw] flex flex-col gap-y-[1vw]">
          {/* Category and Title */}
          <div className="flex flex-col gap-y-[0.3vw]">
            <a className="text-[1.2vw] md:text-[1.1vw] text-[#012247]">
              {article.kategori}
            </a>
            <h1 className="text-[4vw] md:text-[2.5vw] font-bold text-[#012247]">
              {article.title}
            </h1>
            <div className="flex items-center gap-x-[0.4vw]">
              <CalendarDays className="size-[1.3vw] text-[#FFC600]" />
              <p className="text-[1vw] text-gray-500">{article.date}</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] mb-[1vw]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-[0.7vw]"
            />
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <p className="text-[1.2vw] md:text-[1vw] leading-relaxed text-gray-700">
              {article.content}
            </p>
          </div>
        </div>
        <div className="w-[22vw] flex flex-col gap-y-[1.5vw]">
          <div className="flex flex-row gap-x-[0.7vw] items-center">
            <div className="text-[1.5vw] font-semibold text-[#012247]">
              Berita Terbaru
            </div>
            <div className="w-[10vw] h-[0.15vw] bg-[#FFC600]"></div>
          </div>
          <div className="flex flex-col gap-y-[1.2vw] ml-[1vw]">
            {latestNews.map((news, index) => (
              <div key={index} className={`${index !== latestNews.length - 1 ? 'border-b border-gray-200 pb-[1.2vw]' : ''}`}>
                <Link 
                  href={`/artikel/${news.slug}`}
                  className="group"
                >
                  <div className="w-fit flex flex-col gap-y-[0.3vw]">
                    <h3 className="text-[1.1vw] font-medium text-[#012247] group-hover:text-[#FFC600] line-clamp-2 transition-colors">
                      {news.title}
                    </h3>
                    <div className="flex items-center gap-x-[0.4vw]">
                      <p className="text-[0.9vw] text-gray-500">{news.date}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}