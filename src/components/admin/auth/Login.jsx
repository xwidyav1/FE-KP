import React from 'react';
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-500"> 
      <div className="flex flex-row w-[70vw] h-[35vw] bg-gray-100 rounded-[1vw] overflow-hidden"> 
        <div className="relative w-[40vw] aspect-[1276/1080]">
          <Image
            src="/auth-bg.png"
            alt="logo CSIRT Kemhan"
            fill="true"
            style={{ objectFit: "cover" }}
            draggable="false"
            className=""
          />
        </div>
        <div className="flex flex-col w-[30vw] justify-center items-center gap-y-[2vw]"> 
          <div className="relative w-[15vw] aspect-[2114/579]"> 
            <Image
              src="/logo-csirt-kemhan.png"
              alt="logo CSIRT Kemhan"
              fill="true"
              style={{ objectFit: "contain" }} 
              draggable="false"
              className="" 
            />
          </div>
          <div className="flex flex-col w-[25vw] gap-y-[1vw]">
            <p className="font-semibold text-[1.3vw]">Login</p>
            <div>
              <p>username</p>
              <input 
                type="text" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                placeholder="Masukkan username" 
              />
            </div>
            <div>
              <p>password</p>
              <input 
                type="password" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                placeholder="Masukkan password" 
              />
            </div>
            <div className="h-[6vw]">
              CAPTCHA
            </div>
            <button className="h-[2.5vw] bg-black text-white rounded-[1vw]">
              Login
            </button>
          </div>
          {/* Add buttons for login, forgot password, etc. */}
        </div>
      </div>
    </div>
  );
}

export default Login;