import React from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { 
  LayoutDashboard, 
  File,
  Images,
  Send,
  Newspaper, 
  Folders, 
  CreditCard, 
  Settings, 
  User
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (   
      <div className="flex flex-col">
        <div className="h-[5vw] flex justify-center items-center bg-slate-100"> 
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
              <CommandEmpty>No results found.</CommandEmpty>
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
        </Command>
      </div>
  )
}

export default Sidebar
