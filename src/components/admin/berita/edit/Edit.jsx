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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { posts } from '@/components/admin/posts/posts';
import { useParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/admin/richtexteditor";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Judul berita belum terisi!",
  }),
  category: z.string().min(1, {
    message: "Kategori berita belum dipilih!",
  }),
  body: z.string().min(1, {
    message: "Isi berita belum terisi!",
  }),
  photo: z.union([
    z.string(), // Untuk default URL photo
    z.any().refine((file) => file instanceof File, {
      message: "Masukkan foto berita!",
    }), // Untuk file yang diupload
  ]),
});

const Edit = () => {
  const { toast } = useToast();
  const params = useParams(); // Get the params
  const id = params?.id;

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || '',
      body: post?.body || '',
      category: post?.category || '',
      // date: post?.date || '',
      photo: post?.image || '',
    },
  });

  const handleSubmit = (data) => {
    toast({
      title: 'Post has been updated successfully',
      description: `Updated by ${post?.category} on ${post?.date}`,
    });

    // Logika untuk mengupdate data post di backend dapat ditambahkan di sini
    console.log('Updated Data:', data);
  };

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
                    defaultValue={post.category} // Default value dari post.js
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
            name="body"
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
            name="photo"
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
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full dark:bg-slate-800 dark:text-white">
            Update Post
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Edit;
