"use client";

import { useState } from "react";
import BackButton from "@/components/admin/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "@/components/admin/richtexteditor";
import PedomanTeknis from "@/components/admin/dokumen/PedomanTeknis";
import DaftarKegiatan from "@/components/admin/dokumen/DaftarKegiatan";

// Skema validasi form untuk masing-masing opsi
const schemas = {
  "rfc id": z.object({
    file: z.any().refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Masukkan file PDF yang valid!",
    }),
  }),
  "rfc english": z.object({
    file: z.any().refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Masukkan file PDF yang valid!",
    }),
  }),
  "aduan siber": z.object({
    body: z.string().min(1, { message: "Isi aduan belum terisi!" }),
    photo: z.any().refine((file) => file instanceof File, {
      message: "Masukkan file gambar (png, jpg, jpeg)!",
    }),
  }),
  "layanan va": z.object({
    body: z.string().min(1, { message: "Isi layanan VA belum terisi!" }),
    photo: z.any().refine((file) => file instanceof File, {
      message: "Masukkan file gambar (png, jpg, jpeg)!",
    }),
  }),
  "pedoman teknis": z.object({
    name: z.string().min(1, { message: "Nama dokumen belum terisi!" }),
    file: z.any().refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Masukkan file PDF yang valid!",
    }),
  }),
  "kegiatan": z.object({
    acara: z.string().min(1, { message: "Nama acara tidak boleh kosong!" }),
    tanggal: z.string().min(1, { message: "Tanggal tidak boleh kosong!" }),
    tempat: z.string().min(1, { message: "Tempat tidak boleh kosong!" }),
    materi: z
      .array(z.any().refine((file) => file instanceof File && file.type === "application/pdf", {
        message: "Hanya file PDF yang diperbolehkan!",
      }))
      .min(1, { message: "Minimal satu file materi diperlukan!" }),
  }),
};

const Dokumen = () => {
  const [formType, setFormType] = useState("rfc id");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const form = useForm({
    resolver: zodResolver(schemas[formType]),
    defaultValues: {
      file: null,
      name: "",
      body: "",
      photo: null,
      acara: "",
      tanggal: "",
      tempat: "",
      materi: [],
    },
  });

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
  
    switch (formType) {
      case "rfc id":
        if (data.file) {
          console.log("Mengirim rfc id:", {
            file: data.file.name,
          });
        } else {
          console.error("File belum dipilih untuk RFC ID");
        }
        break;
  
      case "rfc english":
        if (data.file) {
          console.log("Mengirim rfc english:", {
            file: data.file.name,
          });
        } else {
          console.error("File belum dipilih untuk RFC English");
        }
        break;
  
      case "aduan siber":
        if (data.body && data.photo) {
          console.log("Mengirim aduan siber:", {
            body: data.body,
            photo: data.photo.name,
          });
        } else {
          console.error("Isi atau foto untuk Aduan Siber belum lengkap");
        }
        break;
  
      case "layanan va":
        if (data.body && data.photo) {
          console.log("Mengirim layanan va:", {
            body: data.body,
            photo: data.photo.name,
          });
        } else {
          console.error("Isi atau foto untuk Layanan VA belum lengkap");
        }
        break;
  
      case "pedoman teknis":
        if (data.file) {
          console.log("Mengirim pedoman teknis:", {
            file: data.file.name,
          });
        } else {
          console.error("File belum dipilih untuk Pedoman Teknis");
        }
        break;
  
      case "kegiatan":
        if (
          data.acara &&
          data.tanggal &&
          data.tempat &&
          Array.isArray(data.materi) &&
          data.materi.length > 0
        ) {
          console.log("Mengirim data kegiatan:", {
            acara: data.acara,
            tanggal: data.tanggal,
            tempat: data.tempat,
            materi: data.materi.map((file) => file.name),
          });
        } else {
          console.error("Data kegiatan belum lengkap, pastikan semua isian terisi");
        }
        break;
  
      default:
        console.log("FormType tidak dikenal");
    }
  };
  

  const handleRemoveFile = (index) => {
    // Hapus file dari uploadedFiles
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  
    // Update nilai input materi di react-hook-form
    form.setValue("materi", updatedFiles, { shouldValidate: false });
  };

  return (
    <div>
      <BackButton text="Kembali" link="/admin" />
      <div className="flex flex-col gap-y-[2vw] mb-[10vw]">
        <Select
          onValueChange={(value) => {
            setFormType(value);
            form.reset();
          }}
          defaultValue="rfc id"
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rfc id">RFC ID</SelectItem>
            <SelectItem value="rfc english">RFC English</SelectItem>
            <SelectItem value="aduan siber">Aduan Siber</SelectItem>
            <SelectItem value="layanan va">Layanan VA</SelectItem>
            <SelectItem value="pedoman teknis">Pedoman Teknis</SelectItem>
            <SelectItem value="kegiatan">Kegiatan</SelectItem>
          </SelectContent>
        </Select>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {formType === "rfc id" && (
              <>
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File RFC ID</FormLabel>
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
                <Button type="submit">Upload</Button>
              </>             
            )}

            {formType === "rfc english" && (
              <>
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File RFC English</FormLabel>
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
                <Button type="submit">Upload</Button>
              </>              
            )}

            {formType === "aduan siber" && (
              <>
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
                      <FormLabel>Gambar</FormLabel>
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
                <Button type="submit">Upload</Button>
              </>
            )}

            {formType === "layanan va" && (
              <>
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
                      <FormLabel>Gambar</FormLabel>
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
                <Button type="submit">Upload</Button>
              </>
            )}

            {formType === "pedoman teknis" && (
              <>
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
                <Button type="submit">Upload</Button>
                <div className="pt-[5vw]">
                  <PedomanTeknis className="pt-[10vw]" limit={5} title="Pedoman Teknis" />
                </div>
              </>              
            )} 

            {formType === "kegiatan" && (
              <>
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
                        <Input type="date" {...field} />
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
                              setUploadedFiles(combinedFiles); // Update state
                              field.onChange(combinedFiles);  // Update react-hook-form
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

                <Button type="submit">Upload</Button>
                <div className="pt-[5vw]">
                  <DaftarKegiatan className="pt-[10vw]" limit={5} title="Daftar Kegiatan" />
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Dokumen;
