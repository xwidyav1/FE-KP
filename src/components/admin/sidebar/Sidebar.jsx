"use client"

import React, { useState } from 'react';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { 
  LayoutDashboard, 
  File,
  Images,
  Send,
  User,
  Users,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
    const handleLogout = () => {
      // Tambahkan logika logout di sini, misalnya clear token atau redirect
      console.log("User logged out");
      setIsLogoutModalOpen(false);
    };

  return (   
      <div className="flex flex-col">
        <div className="h-[5vw] flex justify-center items-center bg-slate-200"> 
          <div className="relative w-[10vw] aspect-[2114/579]"> 
            <Image
              src="/logo-csirt-kemhan.png"
              alt="logo CSIRT Kemhan"
              fill="true"
              style={{ objectFit: "contain" }} 
              draggable="false"
              className="" 
            />
          </div>
        </div>
        <Command className="bg-slate-200 rounded-none">
        <CommandSeparator className="bg-[#CBAE25]"/>
          <CommandGroup heading="Main Menu">
            <CommandSeparator />
            <CommandList>
              <CommandItem>
                <LayoutDashboard className="mr-[0.5vw] h-[1vw] w-[1vw]" />
                <Link href="/admin">Dashboard</Link>
              </CommandItem>
              <CommandItem>
                <Send className="mr-[0.5vw] h-[1vw] w-[1vw]" />
                <Link href="/admin/artikel">Artikel</Link>
              </CommandItem>
              <CommandItem>
                <Images className="mr-[0.5vw] h-[1vw] w-[1vw]" />
                <Link href="/admin/galeri">Galeri</Link>
              </CommandItem>
              <CommandItem>
                <File className="mr-[0.5vw] h-[1vw] w-[1vw]" />
                <Link href="/admin/dokumen">Dokumen</Link>
              </CommandItem>
            </CommandList>
          </CommandGroup> 
          <CommandSeparator />
          <CommandGroup heading="Admin">
            <CommandList>
              <CommandItem>
                <User className="mr-[0.5vw] h-[1vw] w-[1vw]" />
                <Link href="/admin/profile">Profile</Link>
              </CommandItem>
              <CommandItem>
                <Users className="mr-[0.5vw] h-[1vw] w-[1vw]" />
                <Link href="/admin/team">Team</Link>
              </CommandItem>
              <CommandItem className="text-red-500">
                <button 
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="flex flex-row items-center gap-x-[0.6vw]">
                  <LogOut className="mr-[0.5vw] h-[1vw] w-[1vw] " />                
                  Log Out
                </button>
              </CommandItem>
            </CommandList>
          </CommandGroup>      
        </Command>

        {/* Modal Logout */}
        {isLogoutModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[20vw] text-center">
              <h2 className="text-black text-lg font-semibold mb-4">Yakin keluar ?</h2>
              <div className="flex justify-center gap-x-4">
                <button
                  className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  onClick={() => setIsLogoutModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  )
}

export default Sidebar
