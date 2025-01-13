"use client"

import { useEffect } from "react";
// import Image from "next/image";
import { House, Phone, Mail } from 'lucide-react';
import FadeIn from "@/components/transitions/FadeIn";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useSpring,
} from "framer-motion";

const customEase = (t) => {
  return 1 - Math.pow(1 - t, 8);
};

const Counter = ({ from, to, duration = 5 }) => {
  const count = useMotionValue(from);
  const smoothCount = useSpring(count, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const rounded = useTransform(smoothCount, (latest) => Math.round(latest));

  useEffect(() => {
    const animation = animate(count, to, {
      duration,
      ease: customEase,
      onComplete: () => {
        count.set(to);
      },
    });
    return animation.stop;
  }, [count, to, duration]);

  return <motion.span>{rounded}</motion.span>;
};

export default function Kontak() {
  return (
    <FadeIn
      direction="right"
      order={1}
      className="w-full h-auto bg-[#FFFFFF]">
      <div className="md:h-[60vw] min-h-screen flex flex-col md:gap-y-[3vw] pt-[8vw] px-[5vw] md:px-[10vw]">
        <div className="max-md:relative max-md:h-[50vw] flex flex-row items-center gap-x-[37vw]">
          <div className="flex flex-col md:flex-row gap-x-[1vw] md:items-center">
            <h2 className="w-[80vw] md:w-[auto] text-[6vw] md:text-[2.5vw] text-[#012247] font-semibold top-[0vw] left-[0vw]">
              Hubungi Kami
            </h2>
            <div className="w-[16vw] md:w-[10vw] h-[0.5vw] md:h-[0.15vw] bg-[#FFC600]">        
            </div>
          </div>
          <div className="max-md:absolute text-[4.2vw] md:text-[1.5vw] top-[35vw] md:top-[10vw] italic right-[0vw]">
            255.255.255.
            <Counter from={0} to={255} />
          </div>
        </div>
        <FadeIn 
          direction="top"
          order={2}
          className="flex flex-col md:flex-row justify-center max-md:gap-y-[7vw] md:gap-x-[2vw]">
          <div className="w-[90vw] md:w-[43vw] h-[90vw] md:h-[33vw] bg-white rounded-[2vw] md:rounded-[1vw] shadow-[0_0.52vw_1.56vw_0_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="md:rounded-[1vw] overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.7032324438433!2d106.79018917226335!3d-6.312781892074654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef23a2ac03e3%3A0xd9cc8ced32a3bd7e!2sPUSHANSIBER%20BAINSTRAHAN%20KEMHAN!5e0!3m2!1sid!2sid!4v1736065829896!5m2!1sid!2sid" 
                style={{border:0 }}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="max-md:hidden m-[2vw] w-[39vw] h-[29vw] rounded-[0.5vw]">
              </iframe>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6258595507466!2d106.7888849619818!3d-6.312781892074654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef23a2ac03e3%3A0xd9cc8ced32a3bd7e!2sPUSHANSIBER%20BAINSTRAHAN%20KEMHAN!5e0!3m2!1sid!2sid!4v1736718309682!5m2!1sid!2sid"
                style={{border:0 }}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="md:hidden m-[5vw] w-[80vw] h-[80vw] rounded-[1vw]">
              </iframe>
            </div>          
          </div>
          <div className="md:w-[30vw] h-auto md:h-[25vw] bg-white rounded-[2vw] md:rounded-[1vw] shadow-[0_0.52vw_1.56vw_0_rgba(0,0,0,0.15)] max-md:mb-[30vw] max-md:pb-[8vw]">
            <div className="flex flex-col gap-y-[4vw] md:gap-y-[1vw] mt-[8vw] md:mt-[2vw] mx-[5vw] md:mx-[1.5vw]">
              <div className="flex flex-row gap-x-[3vw] md:gap-x-[1.5vw]">
                <div className="flex items-center justify-center w-[9vw] md:w-[3vw] h-[9vw] md:h-[3vw] border-[0.4vw] md:border-[0.1vw] border-[#012247] rounded-full">
                  <House className="w-[13.6vw] h-[5.1vw] md:w-[1.7vw] md:h-[1.7vw] text-[#012247]" />   
                </div>             
                <p className="md:w-[21vw] text-[4vw] md:text-[1vw]">
                Gedung Sutan Sjahrir (Pushansiber) Jalan Pondok Labu Raya, 
                RT.6/RW.6, Pd. Labu, Kec. Cilandak, Kota Jakarta Selatan, 
                Daerah Khusus Ibukota Jakarta 12450
                </p>
              </div>
              <div className="w-auto h-[0.5vw] md:h-[0.1vw] bg-[#FFC600] ml-[12vw] md:ml-[4.5vw] mr-[1.5vw]">        
              </div>
              <div className="flex flex-row items-center gap-x-[3vw] md:gap-x-[1.5vw]">
                <div className="flex items-center justify-center w-[9vw] md:w-[3vw] h-[9vw] md:h-[3vw] border-[0.4vw] md:border-[0.1vw] border-[#012247] rounded-full">
                  <Phone className="w-[4.5vw] h-[4.5vw] md:w-[1.5vw] md:h-[1.5vw] text-[#012247]" />   
                </div>
                <p className="text-[4vw] md:text-[1vw]">
                  (+62) 21 2977 000 1
                </p>
              </div>
              <div className="w-auto h-[0.5vw] md:h-[0.1vw] bg-[#FFC600] ml-[12vw] md:ml-[4.5vw] mr-[1.5vw]">        
              </div>
              <div className="flex flex-row items-center gap-x-[3vw] md:gap-x-[1.5vw]">
                <div className="flex items-center justify-center w-[9vw] md:w-[3vw] h-[9vw] md:h-[3vw] border-[0.4vw] md:border-[0.1vw] border-[#012247] rounded-full">
                  <Mail className="w-[4.5vw] h-[4.5vw] md:w-[1.5vw] md:h-[1.5vw] text-[#012247]" />   
                </div>
                <div className="flex flex-col text-[4vw] md:text-[1vw]">
                  <p>
                    Official : csirt@kemhan.go.id
                  </p>
                  <p>
                    Helpdesk : cs.csirt@kemhan.go.id
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>     
    </FadeIn>
    
  )
}
