"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { admins } from "@/components/admin/team/data_admin";
import { Trash2, Plus } from "lucide-react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Team = () => {
  const itemsPerPage = 5; // Jumlah item per halaman
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(""); // "add" or "edit"
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null); // Untuk pesan keberhasilan/kegagalan

  // Calculate total pages
  const totalPages = Math.ceil(admins.length / itemsPerPage);

  // Get admins for the current page
  const paginatedAdmins = admins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page navigation
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Open Modal for Add or Edit
  const openModal = (mode, admin = null) => {
    setModalMode(mode);
    setSelectedAdmin(admin);
    setFormData(
      admin ? { username: admin.username, password: admin.password } : { username: "", password: "" }
    );
    setIsModalOpen(true);
  };

  // Handle Save/Edit Admin
const handleSave = () => {
  if (modalMode === "add") {
    const isSuccess = Math.random() > 0.5; // Simulasi sukses/gagal
    setMessage({
      text: isSuccess ? "Berhasil menambahkan admin." : "Gagal menambahkan admin.",
      isSuccess: isSuccess,
    });
  } else if (modalMode === "edit") {
    const isSuccess = Math.random() > 0.5; // Simulasi sukses/gagal
    setMessage({
      text: isSuccess ? "Berhasil mengedit admin." : "Gagal mengedit admin.",
      isSuccess: isSuccess,
    });
  }
  setIsModalOpen(false);
};

// Handle Delete Admin
const handleDelete = () => {
  const isSuccess = Math.random() > 0.5; // Simulasi sukses/gagal
  setMessage({
    text: isSuccess ? "Berhasil menghapus admin." : "Gagal menghapus admin.",
    isSuccess: isSuccess,
  });
  setIsModalOpen(false);
  setSelectedAdmin(null);
};

  return (
    <div className="mb-[7vw] id=tabel mt-[5vw]">
      <div className="flex flex-row justify-between">
        <h3 className="text-[1.7vw] mb-[1vw] font-semibold">Daftar Admin</h3>
        <button
          className="flex flex-row items-center justify-center w-[10vw] h-[2.5vw] rounded-[0.5vw] gap-x-[0.5vw] bg-blue-500 hover:bg-blue-700 text-white font-semibold mr-[5vw]"
          onClick={() => openModal("add")}
        >
          <Plus />
          <p>add admin</p>
        </button>
      </div>

       {/* Pesan Keberhasilan/Kegagalan */}
       {message && (
        <div
          className={`p-2 rounded mb-4 text-center text-white ${
            message.isSuccess ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAdmins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.id}</TableCell>
              <TableCell>{admin.username}</TableCell>
              <TableCell>{admin.password}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell>{new Date(admin.lastLogin).toLocaleString()}</TableCell>
              <TableCell className="flex justify-center gap-x-[1vw]">
                <button
                  onClick={() => openModal("edit", admin)}
                  className="w-[4vw] h-[2.5vw] bg-blue-500 hover:bg-blue-700 text-white font-semibold py-[0.5vw] px-[1.1vw] rounded text-[1vw] flex items-center justify-center"
                >
                  Edit
                </button>
                <button 
                  onClick={() => openModal("delete", admin)}
                  className="w-[3vw] h-[2.5vw] bg-red-500 hover:bg-red-700 text-white font-bold rounded flex items-center justify-center">
                  <Trash2 />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="max-md:hidden flex flex-row justify-end items-center w-full mt-[2vw] gap-x-[2vw] pr-[3vw]">
        <div className="text-black text-[1vw]">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex flex-row justify-between gap-x-[0.5vw]">
          <button
            href="#tabel"
            className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            <MdKeyboardDoubleArrowLeft />
          </button>
          <button
            href="#tabel"
            className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            href="#tabel"
            className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
          <button
            href="#tabel"
            className="flex items-center justify-center w-[2.5vw] h-[2.5vw] text-[1.7vw] border-[0.1vw] border-gray-300 rounded-[0.5vw] disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 duration-200 ease-in-out"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-[30vw]">
            {modalMode === "delete" ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Hapus Admin?</h2>
                <p className="mb-4">Apakah Anda yakin ingin menghapus admin ini?</p>
                <div className="flex justify-end gap-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Hapus
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  {modalMode === "add" ? "Add Admin" : "Edit Admin"}
                </h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, username: e.target.value }))
                      }
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, password: e.target.value }))
                      }
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="flex justify-end gap-x-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      {modalMode === "add" ? "Add" : "Edit"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
