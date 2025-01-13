"use client";

import { useState, useEffect, useMemo } from "react";
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

const schemas = {
  berita: z.object({
    title: z.string().min(1, { message: "Judul berita belum terisi!" }),
    category: z.string().min(1, { message: "Kategori berita belum dipilih!" }),
    content: z.string().min(1, { message: "Isi berita belum terisi!" }),
    image: z
      .any()
      .refine((file) => file instanceof File, { message: "Masukkan foto berita!" }),
  }),
  profil: z.object({
    content: z.string().min(1, { message: "Deskripsi profil organisasi belum terisi!" }),
    link_video: z.string().url( { message: "Deskripsi profil organisasi belum terisi!" }),
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
  const [initialData, setInitialData] = useState(null);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const formIds = useMemo(() => ({
    profil: 1122,
    visi: 2233,
    misi: 3456,
  }), []);

  const form = useForm({
    resolver: zodResolver(schemas[formType]),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      image: undefined,
    },
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data untuk formType: ${formType}`);
        setLoadingFetch(true);
  
        const id = formIds[formType];
        const response = await axios.get(`${BACKEND_URL}/artikel/${id}`);
        console.log("Data fetched:", response.data);
  
        // Asumsikan data ada di response.data tanpa pembungkus tambahan
        const data = response.data;
  
        if (!data) {
          throw new Error("Data tidak ditemukan");
        }
  
        setInitialData(data);
  
        // Reset form dengan data yang sesuai
        if (formType === "profil") {
          form.reset({
            content: data.content || "",
            link_video: data.link_video || "",
          });
        } else if (formType === "visi" || formType === "misi") {
          form.reset({
            content: data.content || "",
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        if (formType !== "berita") {
          setLoadingFetch(false);
        }
      }
    };
  
    if (formType !== "berita") {
      fetchData();
    } else {
      form.reset({
        title: "",
        category: "",
        content: "",
        image: undefined,
      });
      setLoadingFetch(false);
    }
  }, [formType, form, formIds]);
  
  

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
      const id = formIds[formType];
      const url = formType === "berita" ? `${BACKEND_URL}/artikel` : `${BACKEND_URL}/artikel/${id}?_method=PUT`;


      if (formType !== "berita") {
        data.title = formType;
        data.category = formType;
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value);
        }
      });

      await axios({
        method:"post",
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Artikel berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal menyimpan artikel:", error);
      alert("Terjadi kesalahan saat menyimpan artikel.");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };
  
  return (
    <div>
      <BackButton text="Kembali" link="/admin" />
      <div className="flex flex-col gap-y-[2vw] mb-[10vw]">
        <Select
          onValueChange={(value) => setFormType(value)}
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
        {loadingFetch ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (

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

                <Button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Upload Berita"}
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
                  name="link_video"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Video</FormLabel>
                      <FormControl>
                        <Input type="url"  placeholder="Masukkan URL Video" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Upload Profil"}
                </Button>
              </>
            )}

            {formType === "visi"  && (
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
                  {loading ? "Loading..." : `Upload ${formType.charAt(0).toUpperCase() + formType.slice(1)}`}
                </Button>
              </>
            )}
            {formType === "misi"  && (
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
                  {loading ? "Loading..." : `Upload ${formType.charAt(0).toUpperCase() + formType.slice(1)}`}
                </Button>
              </>
            )}
          </form>
        </Form>
      )}
      </div>
    </div>
  );
};

export default Artikel;
