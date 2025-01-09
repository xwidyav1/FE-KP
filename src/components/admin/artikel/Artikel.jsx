"use client";

import { useState } from "react";
import BackButton from "@/components/admin/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "@/components/admin/richtexteditor";
import TabelBerita from "@/components/admin/berita/TabelBerita";
import axios from "axios";
const BACKEND_URL = "http://localhost:8000"; 

// Skema validasi form untuk masing-masing opsi
const schemas = {
  berita: z.object({
    title: z.string().min(1, { message: "Judul berita belum terisi!" }),
    category: z.string().min(1, { message: "Kategori berita belum dipilih!" }),
    content: z.string().min(1, { message: "Isi berita belum terisi!" }),
    image: z.any().refine((file) => file instanceof File, { message: "Masukkan foto berita!" }),
  }),
  profil: z.object({
    content: z.string().min(1, { message: "Deskripsi profil organisasi belum terisi!" }),
    image: z.string().url({ message: "Pastikan link video benar!" }),
  }),
  visi: z.object({
    content: z.string().min(1, { message: "Masukkan visi organisasi!" }),
  }),
  misi: z.object({
    content: z.string().min(1, { message: "Masukkan misi organisasi!" }),
  }),
};

const Artikel = () => {
  const [formType, setFormType] = useState("berita");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schemas[formType]),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true); // Indikator loading
    try {
      // Step 1: Mendapatkan CSRF cookie dari backend
      await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
        withCredentials: true, // Penting jika menggunakan Sanctum untuk autentikasi
      });
  
      // Step 2: Membuat FormData untuk mengirim data, termasuk file
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value);
        }
      });
  
      // Step 3: Mengirim data ke backend menggunakan POST
      const response = await axios.post(`${BACKEND_URL}/artikel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Mengizinkan pengiriman cookie
      });
  
      // Step 4: Tangani respons jika berhasil
      console.log('Artikel berhasil dibuat:', response.data);
      alert('Artikel berhasil dibuat!');
    } catch (error) {
      // Step 5: Tangani error
      console.error('Gagal membuat artikel:', error);
      alert('Terjadi kesalahan saat membuat artikel.');
    } finally {
      setLoading(false); // Selesai loading
    }
  };
  
  return (
    <div>
      <BackButton text="Kembali" link="/admin" />
      <div className="flex flex-col gap-y-[2vw] mb-[10vw]">
        <Select
          onValueChange={(value) => {
            setFormType(value);
            form.reset({
              title: value === "profil" ? "profil" : "", "visi" : "visi", "misi" : "misi",
              category: value === "profil" ? "profil" : "", "visi" : "visi", "misi" : "misi",
              content: "",
              image: null,
          
            });
          }}
          defaultValue="berita"
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="berita">Berita</SelectItem>
            <SelectItem value="profil">Profil</SelectItem>
            <SelectItem value="visi">Visi</SelectItem>
            <SelectItem value="misi">Misi</SelectItem>
          </SelectContent>
        </Select>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {formType === "berita" && (
              <>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan Judul" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue=""
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kategori Berita" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="csirt">Berita CSIRT-Kemhan</SelectItem>
                            <SelectItem value="peringatan">Peringatan Keamanan</SelectItem>
                            <SelectItem value="info">Info Penting</SelectItem>
                            <SelectItem value="lain">Lain-lain</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Isi</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          content={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
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
                      <FormControl>
                        <Input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          onChange={(e) => field.onChange(e.target.files[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                

                <Button
                  type="submit">
                  Upload Berita
                </Button>
                
                <div className="pt-[5vw]">
                  <TabelBerita className="pt-[10vw]" limit={5} title="Semua Berita" />
                </div>
              </>
            )}

            {formType === "profil" && (
              <>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Isi</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          content={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
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
                      <FormLabel>Link Video</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan URL Video" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Upload</Button>
              </>
            )}

            {formType === "visi" && (
              <>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Isi</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          content={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">upload</Button>
              </>
              
            )}

            {formType === "misi" && (
              <>
                <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Isi</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Upload"}
                </Button>
              </>
              
            )}
            
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Artikel;
