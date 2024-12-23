import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/landing/navbar/Navbar";
import BackToTop from "@/components/landing/BackToTop";

const poppins = Poppins({
  subsets: ['latin'],
  weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "CSIRT KEMHAN RI",
  description: "Tim Penanganan Insiden Keamanan Siber Pusat Pertahanan Siber Badan instalasi Strategis Pertahanan Kementerian Pertahanan Republik Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
       <Link rel="icon" href="./favicon.ico" />
      </Head>
      <body
        className={poppins.className}
      >
        {children}
        <Navbar />
        <BackToTop />
      </body>
    </html>
  );
}
