import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { Menu, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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


const Navbar = () => {
  return (
    <div className="text-white pl-[1vw] pr-[2vw] ml-[13vw] bg-slate-100 flex justify-between gap-x-[1vw] items-center w-[87vw] h-[5vw]"> 
      <button>
        <Menu color="black"/>
      </button>
      {/* <Command className="h-auto">
        <CommandInput placeholder="Search..." />
      </Command> */}
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex flex-row items-center gap-x-[1vw]">
            <div className="flex items-center justify-center w-[2.5vw] h-[2.5vw] rounded-full border-[0.1vw] border-black">
              <User className="text-black"/>
            </div>
            <div className="w-auto text-[1.1vw] text-black">
              I&apos;m Admin
            </div> 
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem
             className="text-red-500"
          >
            Log Out 
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        
    </div>
  )
}

export default Navbar
