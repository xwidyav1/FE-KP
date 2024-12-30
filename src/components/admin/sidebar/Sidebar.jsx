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
  Image,
  Send,
  Newspaper, 
  Folders, 
  CreditCard, 
  Settings, 
  User
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
   
      <Command className="bg-slate-200 rounded-none">
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Main Menu">
            <CommandItem>
              <LayoutDashboard className="mr-[0.5vw] h-[1vw] w-[1vw]" />
              <Link href="/admin">Dashboard</Link>
            </CommandItem>
            <CommandItem>
              <Send className="mr-[0.5vw] h-[1vw] w-[1vw]" />
              <Link href="/admin/artikel">Artikel</Link>
            </CommandItem>
            <CommandItem>
              <Image className="mr-[0.5vw] h-[1vw] w-[1vw]" />
              <Link href="/admin/galeri">Galeri</Link>
            </CommandItem>
            <CommandItem>
              <File className="mr-[0.5vw] h-[1vw] w-[1vw]" />
              <Link href="/admin/dokumen">Dokumen</Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
   
  )
}

export default Sidebar
