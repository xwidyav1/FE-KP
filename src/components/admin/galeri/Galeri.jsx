"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/admin/BackButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import axios from "axios";
const BACKEND_URL = 'http://localhost:8000';

// Skema validasi form untuk galeri
const gallerySchema = z.object({
  title: z.string().min(1, { message: "Nama kegiatan belum terisi!" }),
  description: z.string().min(1,{ message: "Deskripsi belum terisi!" }),
  image: z.any().refine((file) => file instanceof File, { message: "Masukkan gambar!" }),
});

const Galeri = () => {
  const [formType] = useState("galeri");
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  

  const form = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value);
        }
      });

      await axios.post(`${BACKEND_URL}/galleries`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      alert("Gallery berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal menyimpan gallery:", error);
      alert("Terjadi kesalahan saat menyimpan gallery.");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <BackButton text="Kembali" link="/admin" />
      <div className="flex flex-col gap-y-[2vw]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kegiatan</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan Nama Kegiatan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan Deskripsi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto</FormLabel>
                <div className="flex flex-col space-y-2">
                  {/* Tampilkan foto saat ini */}
                  {field.value && typeof field.value === "string" ? (
                    <img
                      src={field.value}
                      alt="Current Photo"
                      className="w-[24vw] h-[13.5vw] object-cover rounded-md"
                    />
                  ) : null}
                  <FormControl>
                    <Input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        field.onChange(file); // Menyimpan file di form state
                        if (file) {
                          setPreviewImage(URL.createObjectURL(file)); // Membuat URL pratinjau
                        }
                      }}
                    />
                  </FormControl>
                  {previewImage && (
                  <div className="mt-4">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded"
                    />
                  </div>
                )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
            <Button type="submit" disabled={loading}>
                  {loading ? "Loading..." : `Upload Gallery`}
                </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Galeri;
