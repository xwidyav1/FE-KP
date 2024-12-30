import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = () => {
  return (
    <div className="bg-primary dark:bg-slate-700 text-white pl-[1vw] pr-[2vw] flex justify-between items-center"> 
      <Link href="/admin">       
        <div className="relative w-[5vw] aspect-[1024/1024]">
          <Image
            src="/logo-kemhan.png"
            alt="logo CSIRT Kemhan"
            fill
            style={{ objectFit: "contain" }}
            draggable="false"
          />
        </div>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="text-[1.1vw]">
            Admin CSIRT KEMHAN
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
