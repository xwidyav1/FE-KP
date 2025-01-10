"use client";

import { Poppins } from "next/font/google";
import React, { useState } from "react";
import Navbar from "@/components/admin/navbar/Navbar";
import Sidebar from "@/components/admin/sidebar/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// export const metadata = {
//   title: "Admin Kemhan CSIRT",
//   description: "Admin Kemhan CSIRT website",
// };

export default function RootLayout({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex flex-row">
          {/* Sidebar */}
          <div
            className={`fixed z-10 h-full bg-slate-200 transition-all duration-500 ${
              isSidebarVisible ? "w-[13vw]" : "w-[0vw]"
            }`}
          >
            <Sidebar />
          </div>

          {/* Main Content */}
          <div
            className="w-full flex flex-col overflow-hidden"
          >
            {/* Navbar */}
            <div
              className={`transition-all duration-500 ${
                isSidebarVisible ? "ml-[13vw]" : "ml-[0vw]"
              }`}
            >
              <Navbar toggleSidebar={toggleSidebar} />
            </div>

            {/* Children */}
            <div
              className={`pt-[1vw] px-[5vw] overflow-auto transition-all duration-500 ${
                isSidebarVisible ? "ml-[13vw]" : "ml-[0vw]"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
