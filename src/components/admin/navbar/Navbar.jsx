"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ toggleSidebar }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="text-white pl-[1vw] pr-[2vw] bg-slate-100 flex justify-between gap-x-[1vw] items-center w-full h-[5vw]">
      <button onClick={toggleSidebar}>
        <Menu color="black" />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex flex-row items-center gap-x-[1vw]">
            <div className="flex items-center justify-center w-[2.5vw] h-[2.5vw] rounded-full border-[0.1vw] border-black">
              <User className="text-black" />
            </div>
            <div className="w-auto text-[1.1vw] text-black">I&apos;m Admin</div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/admin/profile">
              <button>Profile</button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/admin/team">
              <button>Team</button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              className="flex flex-row items-center gap-x-[0.5vw] text-red-500"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              Log Out
              <LogOut />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal Logout */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[20vw] text-center">
            <h2 className="text-black text-lg font-semibold mb-4">
              Yakin keluar?
            </h2>
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
  );
};

export default Navbar;
