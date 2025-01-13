"use client"

import { use, useEffect, useState } from 'react';
import { fetchPosts} from '@/components/berita/berita_content';
import Navbar from '@/components/berita/Navbar';
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import { CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import FadeIn from "@/components/transitions/FadeIn";
import { HiArrowRight } from "react-icons/hi";
const BACKEND_URL = "http://localhost:8000";
export default function NewsDetail({ params }) {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const { slug } = use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const latestNews = [...posts]
  .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  .slice(0, 5);

  useEffect(() => {
    if (!loading && posts.length > 0) {
      const currentArticle = posts.find(item => item.slug === slug);
      if (!currentArticle) {
        router.push('/berita/1'); // Redirect to news listing if article not found
      } else {
        setArticle(currentArticle);
      }
    }
  }, [loading, posts, slug, router]);
  

  if (!article) {
    return <div className=""></div>;
  }

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <FadeIn className="flex flex-col md:flex-row px-[5vw] md:px-[10vw] my-[25vw] md:my-[8vw] max-md:gap-y-[25vw] md:gap-x-[3vw]">
        <div className="h-auto md:min-h-screen md:w-[55vw] flex flex-col gap-y-[5vw] md:gap-y-[1vw]">
          {/* Category and Title */}
          <div className="h-auto flex flex-col gap-y-[1vw] md:gap-y-[0.5vw]">
            <a className="text-[3.5vw] md:text-[1.1vw] text-[#012247]">
              {article.category}
            </a>
            <h1 className="text-[6vw] md:text-[2.5vw] md:leading-[3.3vw] font-bold text-[#012247]">
              {article.title}
            </h1>
            <div className="flex items-center gap-x-[1vw] md:gap-x-[0.4vw]">
              <CalendarDays className="size-[5vw] md:size-[1.3vw] text-[#FFC600]" />
              <p className="text-[3.5vw] md:text-[1vw] text-gray-500">{article.updated_at}</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] mb-[1vw]">
            <Image
              src={`${BACKEND_URL}/storage/${article.image}`}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-[1vw] md:rounded-[0.7vw]"
            />
          </div>

          {/* Content */}
          <div className="prose h-auto md:max-w-[55vw]">
            <p className="text-[3.8vw] md:text-[1vw] leading-relaxed text-gray-700">
              {article.content}
            </p>
          </div>
        </div>
        <FadeIn 
          direction="left"
          className="md:w-[22vw] flex flex-col gap-y-[7vw] md:gap-y-[1.5vw]">
          <div className="flex flex-col md:flex-row gap-x-[0.7vw] md:items-center">
            <div className="text-[6vw] md:text-[1.5vw] font-semibold text-[#012247]">
              Berita Terbaru
            </div>
            <div className="w-[16vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600]"></div>
          </div>
          <div className="flex flex-col gap-y-[3.5vw] md:gap-y-[1.2vw] ml-[2vw] md:ml-[1vw]">
            {latestNews.map((news, index) => (
              <div key={index} className={`${index !== latestNews.length - 1 ? 'border-b border-gray-200 pb-[3.5vw] md:pb-[1.2vw]' : ''}`}>
                <Link 
                  href={`/artikel/${news.slug}`}
                  className="group"
                >
                  <div className="w-fit flex flex-col gap-y-[1vw] md:gap-y-[0.3vw]">
                    <h3 className="text-[4vw] md:text-[1.1vw] font-medium text-[#012247] group-hover:text-[#FFC600] line-clamp-2 transition-colors">
                      {news.title}
                    </h3>
                    <div className="flex items-center gap-x-[0.4vw]">
                      <p className="text-[3vw] md:text-[0.9vw] text-gray-500">{news.updated_at}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-end text-[3.8vw] md:text-[1.1vw] items-center gap-x-[0.6vw] pt-[3vw] pb-[15vw]">
            <Link
              href="/berita/1"
              className="relative group flex items-center gap-x-[0.4vw] max-md:underline">
              Lihat Semua
              <HiArrowRight className="w-[5vw] md:w-[1.1vw] group-hover:translate-x-1 transition duration-300" />
              <span className="absolute max-md:hidden bottom-0 left-0 w-full h-[0.1vw] bg-neutral-900 origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
          </div>
        </FadeIn>
      </FadeIn>
      <Footer />
    </div>
  );
}