import React from 'react'

const about = () => {
  return (
    <div className="w-screen h-auto flex flex-col px-[11vw] gap-y-[5vw]">
      <div className="w-auto flex flex-col gap-y-[2.5vw]">
        <div className="w-auto flex flex-row gap-x-[2vw] justify-center items-center">
          <div className="w-[10vw] h-[0.6vw] bg-yellow-300 place-content-center"></div>
          <h1 className="text-center font-bold text-[3vw]">
            Profil CSIRT Kemhan RI
          </h1>
          <div className="w-[10vw] h-[0.6vw] bg-yellow-300 place-content-center"></div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-y-[2vw]">
            <p className="text-[1.1vw]">
              Tim Tanggap Insiden Siber/Computer Security Inicident Response Team Kementerian Pertahanan 
              (CSIRT Kemhan) ditetapkan oleh Menteri Pertahanan melalui Keputusan Menteri Pertahanan 
              (Kepmenhan) Nomor : Kep/ 821/ M/ VII/ 2021 tentang Penetapan Tim Tanggap Insiden Siber 
              Di Lingkungan Kementerian Pertahanan. Dalam Kepmenhan tersebut, Kepala Pusat Pertahanan 
              Siber Badan Instalasi Strategis Pertahanan Kementerian Pertahanan ditunjuk sebagai Ketua 
              CSIRT Kemhan dan ditugaskan untuk melaksanakan perumusan, perencanaan, pembangunan, 
              pengoperasian, pengembangan, pengawasan, evaluasi dan anggaran terkait CSIRT Kemhan.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[1.1vw]">
              <h2>
              CSIRT Kemhan melaksanakan layanan tanggap insiden siber, berupa:
              </h2>
              <li>
                Layanan <strong>reaktif</strong>, yaitu layanan yang terkait dengan kebutuhan melakukan respon terhadap insiden siber termasuk penangkalan, penindakan, dan pemulihan siber.
              </li>
              <li>
                Layanan <strong>proaktif</strong>, yaitu layanan yang mendeteksi dan mencegah serangan siber sebelum ada dampak nyata.
              </li>
              <li>
                Layanan <strong>manajemen kualitas keamanan</strong>, yaitu layanan yang mendukung kegiatan-kegiatan reaktif dan proaktif.
              </li>
            </ul>
            <p className="text-[1.1vw]">
            CSIRT Kemhan secara resmi di-launching pada 8 Desember 2021 dan setiap pengguna sistem 
            elektronik di lingkungan Kementerian Pertahanan merupakan konstituen dari CSIRT Kemhan.
            </p>
          </div>
          {/* <div className="flex-1 flex justify-center items-center">
            <iframe
              className="w-full h-[25vw] rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/x7izdWGQJJo?start=153"
              title="Profil CSIRT Kemhan"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div> */}
        </div>
      </div>
      <div className="w-auto flex flex-col gap-y-[2.5vw]">
        <div className="w-auto flex flex-row gap-x-[2vw] justify-center items-center">
          <div className="w-[10vw] h-[0.6vw] bg-yellow-300 place-content-center flex-grow"></div>
            <h1 className="text-center font-bold text-[3vw]">
              Visi & Misi CSIRT Kemhan RI
            </h1>
          <div className="w-[10vw] h-[0.6vw] bg-yellow-300 place-content-center flex-grow"></div>
        </div>
        <div className="flex flex-col gap-y-[1vw]">
          <h2 className="font-semibold text-[1.5vw]">
            Visi
          </h2>    
          <p>
            Terwujudnya pengelolaan sistem keamanan informasi dengan baik dan aman di Lingkungan 
            Kementerian Pertahanan untuk melindungi aset informasi yang dimiliki oleh Kementerian Pertahanan. 
          </p>
        </div> 
        <div className="flex flex-col gap-y-[1vw]">
          <h2 className="font-semibold text-[1.5vw]">
            Misi
          </h2>
          <p>
            Membangun pertahanan negara yang mampu menjaga kedaulatan di ruang siber, dengan mengamankan sumber daya infrastruktur kritis pertahanan membangun tata kelola sistem informasi pertahanan yang baik.
            Membangun koordinasi, kerjasama dan kolaborasi dengan pihak terkait dan negara lain untuk membangun pertahanan siber yang tangguh.
            Menyediakan dan mengoptimalkan sumber daya pertahanan siber melalui proses pembelajaran dan peningkatan kualitas yang berkelanjutan.
          </p>
        </div>           
      </div>
    </div>
  )
}

export default about
