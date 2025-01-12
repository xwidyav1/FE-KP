"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/admin/BackButton';
const BACKEND_URL = 'http://localhost:8000';

const gallerySchema = z.object({
  title: z.string().min(1, { message: "Nama kegiatan belum terisi!" }),
  description: z.string().min(1, { message: "Deskripsi belum terisi!" }),
  image: z.any().refine((file) => file instanceof File, { message: "Masukkan gambar!" }),
});

const EditGaleri = () => {
  const { toast } = useToast();
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  const form = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: '',
      description: '',
      image: null,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/galleries/${id}`);
        setInitialData(data);
        form.reset({
          title: data.title,
          description: data.description,
          image: null,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    if (id) fetchData();;
  }, [id, form]);

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

      await axios.post(`${BACKEND_URL}/galleries/${id}?_method=PUT`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      toast({
        title: "Berhasil",
        description: "Gallery berhasil diperbarui!",
        status: "success",
      });
    } catch (error) {
      console.error("Gagal menyimpan gallery:", error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan gallery.",
        status: "error",
      });
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BackButton text="Kembali" link="/admin/galeri" />
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
                    <Textarea placeholder="Masukkan Deskripsi" {...field} />
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
              {loading ? "Loading..." : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditGaleri;