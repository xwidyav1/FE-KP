import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import FadeIn from "@/components/transitions/FadeIn";
import Image from "next/image";

const menu = [{ section: "Beranda" }];

const NavbarGaleri = ({ middle = false }) => {
  return (
    <div
      className={`absolute flex gap-x-[2vw] md:gap-x-[0.7vw] ${
        middle
          ? "left-0 right-0 mx-auto top-[5vw] md:top-[2vw]"
          : "top-[5vw] md:top-[1vw] left-[5vw] md:left-[3vw]"
      } w-fit h-[15vw] md:h-[4.2vw]  p-[2vw] md:p-[0.7vw] bg-white md:rounded-[1vw] md:border-[0.1vw] rounded-[2.5vw] border-none border-shade-white z-[1000] transition-transform duration-300`}>
      <FadeIn direction="down" order={2}>
        <Link
          href="/"
          className="h-full w-[16vw] md:w-[10vw] grid place-content-center">
          <div className="relative w-[5vw] md:w-[10vw] aspect-[2114/579]">
            <Image
              src="/logo-csirt-kemhan.png"
              alt="logo CSIRT KEMHAN"
              fill
              style={{ objectFit: "cover" }}
              draggable="false"
            />
          </div>
        </Link>
      </FadeIn>
      {menu.map((value, index) => (
        <div
          key={index}
          className="flex flex-row items-center gap-x-[1vw] md:gap-x-[0.8vw]">
          <div className="max-md:hidden h-[8vw] md:h-[2vw] w-[0.1vw] md:w-[0.005vw] bg-neutral-300/50"></div>
          <FadeIn direction="down" order={2.2}>
            <Link
              href="/"
              className="md:ml-[0.005vw] h-[14vw] md:h-[3vw] w-[22vw] md:w-[7vw] font-medium rounded-[2.5vw] md:rounded-[0.6vw] bg-inherit text-neutral-700 text-sm-vw-mb md:text-lg-vw flex justify-center items-center gap-x-[2vw] md:gap-x-[.5vw] hover:border-[0.1vw] hover:border-neutral-300">
              <HiArrowLeft className="size-[3vw] md:size-[1vw]" />
              {value.section}
            </Link>
          </FadeIn>
        </div>
      ))}
    </div>
  );
};

export default NavbarGaleri;
