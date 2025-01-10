import React from 'react'
import Image from "next/image";
import { LogOut, User } from 'lucide-react';

export default function Profile() {
  return (
    <div className="flex items-center justify-center">
      
      <div className="w-[50vw] h-[30vw] flex flex-col rounded-[1vw] bg-neutral-100 shadow-[0_0.1vw_0.4vw_0_rgba(0,0,0,0.15)] mt-[3vw]">
        <div className="flex flex-row items-center gap-x-[1vw] ml-[2vw] mt-[2vw]">
          <h1 className="flex justify-center text-[2vw]">
            Profil Saya
          </h1>
         <div className="w-[7vw] h-[0.15vw] bg-[#FFC600]" />
        </div>
        <div className="flex flex-row gap-x-[3vw] pl-[4vw]">
        <div className="flex items-center justify-center w-[15vw] h-[15vw] border-black border-[0.2vw] rounded-[0.5vw] ml-[0vw] mt-[3vw] mr-[0vw]"> 
          <div className="flex items-center justify-center w-[10vw] h-[10vw] rounded-full border-[0.1vw] border-black">
            <User className="text-black" size={128}/>
          </div>
        </div>
        <div className="flex flex-col mt-[3vw] gap-y-[1vw] w-[30vw]">
          <div className="flex flex-row gap-x-[1vw]">
            <p>
              Username :
            </p>
            <div>
              isi username
            </div>
          </div>
          <div className="flex flex-row gap-x-[1vw]">
            <p>
              Password :
            </p>
            <div>
              isi password
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
