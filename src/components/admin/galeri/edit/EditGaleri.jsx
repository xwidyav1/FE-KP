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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { galeri } from '@/components/admin/galeri/data_galeri';
import { useParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const gallerySchema = z.object({
  description: z.string().min(1, { message: "Nama kegiatan belum terisi!" }),
  image: z.any().refine((file) => file instanceof File, { message: "Masukkan gambar!" }),
});

const EditGaleri = () => {
  const { toast } = useToast();
  const params = useParams(); // Get the params
  const id = params?.id;

  const photo = galeri.find((photo) => photo.id === id);

  if (!photo) {
    return <div>Post not found</div>;
  }

  const form = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      description: photo?.description || '',
      image: photo?.imgsrc || '',
    },
  });

  const handleSubmit = (data) => {
    toast({
      title: 'Post has been updated successfully',
    });

    // Logika untuk mengupdate data post di backend dapat ditambahkan di sini
    console.log('Updated Data:', data);
  };

  return (
    <div>
      <BackButton text="Kembali" link="/admin/galeri" />
      <h3 className="text-2xl mb-4">Edit Galeri</h3>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-[1.5vw] mb-[10vw]"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kegiatan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama kegiatan" {...field} />
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
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full dark:bg-slate-800 dark:text-white">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditGaleri;
