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
        <div className="flex flex-row">
          <div className="fixed z-10 h-full w-[13vw] bg-slate-200">
            <Sidebar />
          </div>         
          <div className="w-full flex flex-col overflow-hidden">
            <div>
              <Navbar/>
            </div>
            <div className="ml-[13vw] pt-[1vw] px-[2vw] overflow-auto">
              {children}
            </div>     
          </div>
        </div>       
      </body>
    </html>
  );
}