'use client';

import { useState, useEffect } from "react";
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
import axios from 'axios';
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

const BACKEND_URL = 'http://localhost:8000'; // Ganti dengan URL backend Laravel Anda

const EditKegiatan = () => {
  const { toast } = useToast();
  const params = useParams();
  const id = params?.id;
  console.log("ID:", id);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acara:  '',
      tempat:  '',
      tanggal:  '', 
      materi:  [], 
    },
  });
  useEffect(() => {
    const formatDate = (date) => {
      const [day, month, year] = date.split('-'); // Asumsi format DD-MM-YYYY
      return `${year}-${month}-${day}`; // Ubah ke format YYYY-MM-DD
    };
    const fetchKegiatan = async () => {
      try {
        console.log('Fetching kegiatan...');
        console.log(`Attempting to fetch from: ${BACKEND_URL}/kegiatan/${id}`);
        const { data } = await axios.get(`${BACKEND_URL}/kegiatan/${id}`);
        console.log('Data kegiatan:', data);
        setInitialData(data);
        form.reset({
          acara: data.acara,
          tempat: data.tempat,
          tanggal: formatDate(data.tanggal),
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load article data',
        });
      }
    };

    if (id) fetchKegiatan();
  }, [id, form, toast]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "materi" && Array.isArray(value)) {
          value.forEach((file) => formData.append("materi[]", file));
        } else if (value) {
          formData.append(key, value);
        }
      });

      await axios.post(`${BACKEND_URL}/kegiatan/${id}?_method=PUT`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert(`${formType} berhasil disimpan!`);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

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