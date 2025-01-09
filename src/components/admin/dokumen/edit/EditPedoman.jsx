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
import { guides } from '@/components/admin/dokumen/data_pedoman_teknis';
import { useParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Nama dokumen belum terisi!" }),
  file: z.any().refine((file) => file instanceof File && file.type === "application/pdf", {
    message: "Masukkan file PDF yang valid!",
  }),
});

const EditPedoman = () => {
  const { toast } = useToast();
  const params = useParams(); // Get the params
  const id = params?.id;

  const guide = guides.find((guide) => guide.id === id);

  if (!guide) {
    return <div>Guide not found</div>;
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: guide?.name || '',
      file: guide?.dokumen || '',
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
      <BackButton text="Kembali" link="/admin/dokumen" />
      <h3 className="text-2xl mb-4">Edit Pedoman Teknis</h3>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-[1.5vw] mb-[10vw]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama dokumen</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama dokumen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Pedoman Teknis</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => field.onChange(e.target.files[0])}
                  />
                </FormControl>
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

export default EditPedoman;
