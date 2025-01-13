'use client';

import BackButton from '@/components/admin/BackButton';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import Image from "next/image"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { posts } from '@/components/admin/posts/posts';
import { useParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/admin/richtexteditor";
import axios from 'axios';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
  image: z.any().optional(),
});

const BACKEND_URL = 'http://localhost:8000'; // Ganti dengan URL backend Laravel Anda

const Edit = () => {
  const { toast } = useToast();
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      category: '',
      image: null,
    },
  });

  // Fetch data artikel berdasarkan ID
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/artikel/${id}`);
        setInitialData(data);
        form.reset({
          title: data.title,
          content: data.content,
          category: data.category,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load article data',
        });
      }
    };

    if (id) fetchArticle();
  }, [id, form, toast]);

  // Submit data untuk update artikel
  const handleSubmit = async (data) => {
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

      await axios.post(`${BACKEND_URL}/artikel/${id}?_method=PUT`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      toast({
        title: 'Success',
        description: 'Article updated successfully',
      });
    } catch (error) {
      console.error('Error updating article:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update article',
      });
    } finally {
      setLoading(false);
    }
  };

  // Membersihkan URL object untuk mencegah kebocoran memori
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
      <BackButton text="Kembali" link="/admin" />
      <h3 className="text-2xl mb-4">Edit Berita</h3>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-[1.5vw] mb-[10vw]"
        >
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
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori Berita" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Berita CSIRT-Kemhan">Berita CSIRT-Kemhan</SelectItem>
                      <SelectItem value="Peringatan Keamanan">Peringatan Keamanan</SelectItem>
                      <SelectItem value="Info Penting">Info Penting</SelectItem>
                      <SelectItem value="Lain-lain">Lain-lain</SelectItem>
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
                <div className="flex flex-col space-y-2">
                  {/* Tampilkan foto saat ini */}
                  {field.value && typeof field.value === "string" ? (
                    <Image
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
                    <Image
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

          <Button type="submit" disabled={loading} className="w-full dark:bg-slate-800 dark:text-white">
          {loading ? 'Updating...' : 'Update Berita'}
            
            
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Edit;
