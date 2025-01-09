'use client';

import { useState } from "react";
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
import { events } from '@/components/admin/dokumen/data_kegiatan';
import { useParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  acara: z.string().min(1, { message: "Nama acara tidak boleh kosong!" }),
  tanggal: z.string().min(1, { message: "Tanggal tidak boleh kosong!" }),
  tempat: z.string().min(1, { message: "Tempat tidak boleh kosong!" }),
  materi: z
    .array(z.any().refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Hanya file PDF yang diperbolehkan!",
    }))
    .min(1, { message: "Minimal satu file materi diperlukan!" }),
});

const EditKegiatan = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleRemoveFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    form.setValue("materi", updatedFiles, { shouldValidate: false });
  };
  
  const { toast } = useToast();
  const params = useParams();
  const id = params?.id;

  const event = events.find((event) => event.id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acara: event?.name || '',
      tempat: event?.tempat || '',
      tanggal: event?.date || '', // Pastikan 'date' sudah terisi
      materi: event?.materi || [], // Pastikan materi terisi dengan array
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
      <h3 className="text-2xl mb-4">Edit Kegiatan</h3>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-[1.5vw] mb-[10vw]"
        >
          <FormField
            control={form.control}
            name="acara"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acara</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama acara" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tanggal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal</FormLabel>
                <FormControl>
                <Input type="date" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tempat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tempat</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan tempat acara" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="materi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Materi</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(e) => {
                        const selectedFiles = Array.from(e.target.files);
                        const combinedFiles = [...uploadedFiles, ...selectedFiles];
                        setUploadedFiles(combinedFiles);
                        field.onChange(combinedFiles);
                      }}
                    />
                    {/* Render selected file list */}
                    <div className="mt-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-100 p-2 rounded shadow-sm"
                        >
                          <span className="text-sm">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFile(index)}
                          >
                            Hapus
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
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

export default EditKegiatan;