import Image from "next/image";

const GaleriCard = ({ post }) => {
  // Pastikan URL gambar relatif digabung dengan base URL
  const imageURL = post.image.startsWith("http")
    ? post.image
    : `http://localhost:8000/storage/${post.image}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[80vw] md:w-[21vw] aspect-[16/9] rounded-[0.8vw] overflow-hidden transition-all md:duration-800 md:ease-in-out md:group-hover:w-[20vw] md:mt-[0vw] md:group-hover:mt-[0.5vw]">
        <Image
          src={imageURL} // Gunakan URL yang sudah diperbaiki
          alt={post.title || "Image"} // Fallback untuk alt
          fill
          style={{ objectFit: "cover" }}
          draggable="false"
        />
      </div>
      <p className="w-[20vw] h-[3vw] font-semibold text-sm-vw-mb md:text-[1vw] text-neutral-500 md:text-neutral-900 md:absolute md:bottom-[-100%] md:transition-all md:duration-800 md:ease-in-out md:group-hover:bottom-[0.5vw] overflow-hidden whitespace-normal">
        {post.description || "No description available"} {/* Fallback untuk deskripsi */}
      </p>
    </div>
  );
};

export default GaleriCard;
