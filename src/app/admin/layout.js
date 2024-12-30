import { Poppins } from "next/font/google";
import Navbar from "@/components/admin/navbar/Navbar";
import Sidebar from "@/components/admin/sidebar/Sidebar";
// import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Pilih bobot sesuai kebutuhan
  variable: "--font-poppins", // Variable untuk CSS kustom jika diperlukan
});

export const metadata= {
  title: "Admin Kemhan CSIRT",
  description: "Admin Kemhan CSIRT website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <div className="flex">
          <div className="hidden md:block h-auto w-[15vw]">
            <Sidebar />
          </div>
          <div className="p-[2vw] w-full md:max-w-full">
            {children}
          </div>     
        </div>
      </body>
    </html>
  );
}