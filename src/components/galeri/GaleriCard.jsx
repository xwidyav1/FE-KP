import Image from "next/image";

const GaleriCard = ({ value }) => {
  return (
    <>
      <div className="relative w-[80vw] md:w-[21vw] aspect-[16/9] rounded-[0.8vw] transition-all md:duration-800 md:ease-in-out md:group-hover:w-[20vw] md:mt-[0vw] md:group-hover:mt-[0.5vw] overflow-hidden">
        <Image
          src={value.imgsrc}
          alt={value.description}
          fill
          style={{ objectFit: "cover" }}
          draggable="false"
        />
      </div>
      <p className="w-[20vw] h-[3vw] font-semibold text-sm-vw-mb md:text-[1vw] text-neutral-500 md:text-neutral-900 md:absolute md:bottom-[-100%] md:transition-all md:duration-800 md:ease-in-out md:group-hover:bottom-[0.5vw] overflow-hidden whitespace-normal">
        {value.description}
      </p>
    </>
  );
};

export default GaleriCard;
