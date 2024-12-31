import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { Menu } from 'lucide-react';
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
    <div className="text-white pl-[1vw] pr-[2vw] ml-[13vw] flex justify-between gap-x-[1vw] items-center w-[87vw] h-[5vw]"> 
      <button>
        <Menu color="black"/>
      </button>
      <Command className="h-auto">
        <CommandInput placeholder="Search..." />
      </Command>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex flex-row items-center gap-x-[1vw]">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-auto text-[1.1vw] text-black">
              Admin
            </div> 
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        
    </div>
  )
}

export default Navbar
