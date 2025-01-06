import React from 'react'
import Image from "next/image";

export default function Layanan() {
  return (
    <div className="w-full h-auto flex flex-col pt-[10vw] px-[10vw]">
      <div className="h-[37vw] text-center text-[2.5vw] font-semibold text-[#012247]">
        Dukungan Siber
      </div>
      <div className="flex flex-col gap-y-[7vw]">
        <div className="flex flex-col gap-y-[2vw]">
          <div className="flex flex-row gap-x-[1vw] items-center">
            <div className="text-[2vw] font-semibold text-[#012247]">
              Aduan Siber
            </div>
            <div className="w-[10vw] h-[0.15vw] bg-[#FFC600]">        
            </div>
          </div>
          <div>
          Berdasarkan Peraturan Menteri Pertahanan Nomor 14 Tahun 2019 tentang Organisasi 
          dan Tata Kerja Kementerian Pertahanan, Pusat Pertahanan Siber Bainstrahan Kemhan 
          (Pushansiber) mempunyai   tugas   melaksanakan   penyiapan operasi  siber  
          meliputi  pemantauan,  analisis  dan  pelaporan ancaman  siber,  penindakan,  
          digital  forensik  dan  pemulihan serta pembentukan Computer Emergency Response Team (CERT)
          <br className="max-md:hidden" /> Prosedur Aduan Siber
          <br className="max-md:hidden" />1.  Penerimaan aduan insiden siber melalui telepon 021-75918947 atau surel csirt@kemhan.go.id.
          <br className="max-md:hidden" />2.  Pencatatan aduan insiden siber baik identitas pelapor disertai data dukung dan bukti terjadinya insiden siber.
          <br className="max-md:hidden" />3.  Notifikasi penerimaan aduan insiden siber.
          <br className="max-md:hidden" />4.  Verifikasi aduan insiden siber.
          <br className="max-md:hidden" />5.  Observasi dan investigasi aduan insiden siber.
          <br className="max-md:hidden" />6.  Pemberian rekomendasi cara penanggulanangan insiden siber.
          <br className="max-md:hidden" />7.  Jika administrator IT/pemilik aset tidak dapat menyelesaikan insiden siber dapat meminta BSSN untuk dapat membantu menindaklanjuti aduan insiden siber
          </div>
          <div className="relative w-full h-[49vw] overflow-hidden">
            <Image
              src="/aduan-siber.png"
              alt="Alur Layanan Aduan Siber"
              fill
              className="object-cover"
              draggable="false"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-[2vw]">
          <div className="flex flex-row gap-x-[1vw] items-center">
            <div className="text-[2vw] font-semibold text-[#012247]">
              Layanan Vulnerability Asesment
            </div>
            <div className="w-[10vw] h-[0.15vw] bg-[#FFC600]">        
            </div>
          </div>
          <div className="list-disc list-inside space-y-2">
            <p>
              Layanan Vulnerability Assesment (VA) dikhusukan bagi konstituen CSIRT Kemhan yaitu Satker/Sub Satker di Lingkungan Kementerian Pertahanan. Adapun informasi yang perlu disiapkan untuk pengajuan layanan ini adalah :
            </p>
            <li>Nama Aplikasi/Website yang akan di VA</li>
            <li>PIC aplikasi/website (No. HP & Email)</li>
            <li>Target IP/Domain</li>
            <li>Upload surat permohonan dari satker kepada Pushansiber </li>
            <li>Target IP/Domain </li>
            <li>Upload surat permohonan dari satker kepada Pushansiber</li> 
            <p>
              Berikut Alur Layanan VA :
            </p>
          </div>
          <div className="relative w-full h-[75vw] overflow-hidden">
            <Image
              src="/layanan-va.jpg"
              alt="Alur Layanan VA"
              fill
              className="object-cover"
              draggable="false"
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="flex flex-row gap-x-[1vw] items-center">
            <div className="text-[2vw] font-semibold text-[#012247]">
              Pedoman Teknis
            </div>
            <div className="w-[10vw] h-[0.15vw] bg-[#FFC600]">        
            </div>
          </div>
          <div className="h-[50vw]">

          </div>
        </div>
      </div>
    </div>
  )
}
