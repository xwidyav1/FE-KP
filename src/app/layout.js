import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Pilih bobot sesuai kebutuhan
  variable: "--font-poppins", // Variable untuk CSS kustom jika diperlukan
});

export const metadata = {
  title: "CSIRT KEMHAN RI",
  description:
    "Tim Penanganan Insiden Keamanan Siber Pusat Pertahanan Siber Badan instalasi Strategis Pertahanan Kementerian Pertahanan Republik Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
