import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const GaleriCard = ({ post }) => {
  // Pastikan URL gambar relatif digabung dengan base URL
  const imageURL = post.image.startsWith("http")
    ? post.image
    : `${BACKEND_URL}/api/storage/${post.image}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[80vw] md:w-[21vw] aspect-[16/9] rounded-[2vw] md:rounded-[0.8vw] overflow-hidden transition-all md:duration-800 md:ease-in-out md:group-hover:w-[20vw] mt-[3vw] md:mt-[0vw] md:group-hover:mt-[0.5vw]">
        <Image
          src={imageURL} // Gunakan URL yang sudah diperbaiki
          alt={post.title || "Image"} // Fallback untuk alt
          fill
          style={{ objectFit: "cover" }}
          draggable="false"
        />
      </div>
      <div 
        className="md:w-[20vw] md:h-[3vw] font-semibold text-[4vw] md:text-[1vw] text-[#012247] max-md:px-[7vw] max-md:pt-[2.5vw] md:absolute md:bottom-[-100%] md:transition-all md:duration-800 md:ease-in-out md:group-hover:bottom-[0.5vw] overflow-hidden whitespace-normal prose md:prose-xl"
        dangerouslySetInnerHTML={{ __html: post.description || "No description available" }} 
      />
    </div>
  );
};

export default GaleriCard;
