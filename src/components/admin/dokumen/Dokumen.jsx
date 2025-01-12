"use client";
import axios from "axios";
import { useState, useEffect } from "react";
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

const BACKEND_URL = "http://localhost:8000";

const schemas = {
  RFC_ID: z.object({
    file_path: z.any().refine((file) => file instanceof File, { message: "Masukkan file PDF!" }),
  }),
  RFC_ENGLISH: z.object({
    file_path: z.any().refine((file) => file instanceof File, { message: "Masukkan file PDF!" }),
  }),
  ADUAN_SIBER: z.object({
    description: z.string().min(1, { message: "Isi tidak boleh kosong!" }),
    file_path: z.any().refine((file) => file instanceof File, { message: "Masukkan gambar!" }),
  }),
  LAYANAN_VA: z.object({
    description: z.string().min(1, { message: "Isi tidak boleh kosong!" }),
    file_path: z.any().refine((file) => file instanceof File, { message: "Masukkan gambar!" }),
  }),
  PEDOMAN_TEKNIS: z.object({
    name: z.string().min(1, { message: "Nama dokumen tidak boleh kosong!" }),
    file_path: z.any().refine((file) => file instanceof File, { message: "Masukkan file PDF!" }),
  }),
  kegiatan: z.object({
    acara: z.string().min(1, { message: "Nama acara tidak boleh kosong!" }),
    tanggal: z.string().min(1, { message: "Tanggal tidak boleh kosong!" }),
    tempat: z.string().min(1, { message: "Tempat tidak boleh kosong!" }),
    materi: z
      .array(z.any().refine((file) => file instanceof File && file.type === "application/pdf", { message: "Hanya file PDF yang diperbolehkan!" }))
      .min(1, { message: "Minimal satu file materi diperlukan!" }),
  }),
};

const STATIC_IDS = {
  RFC_ID: 123,
  RFC_ENGLISH: 456,
  ADUAN_SIBER: 789,
  LAYANAN_VA: 1234,
};

const Dokumen = () => {
  const [formType, setFormType] = useState("RFC_ID");
  const [uploadedFiles, setUploadedFiles] = useState([]);
const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const defaultValues = {
    RFC_ID: {name:'', file_path: undefined },
    RFC_ENGLISH: {name:"", file_path: undefined },
    ADUAN_SIBER: {name:"", description: "", file_path: undefined },
    LAYANAN_VA: {name:"", description: "", file_path: undefined },
    PEDOMAN_TEKNIS: { name: "", file_path: undefined },
    kegiatan: { acara: "", tanggal: "", tempat: "", materi: [] },
  };
  const form = useForm({
    resolver: zodResolver(schemas[formType]),
    defaultValues:defaultValues[formType],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoadingFetch(true);
      try {
        const id = STATIC_IDS[formType];
        const response = await axios.get(`${BACKEND_URL}/documents/${id}`);
        const data = response.data;
  
        if (!data) throw new Error("Data tidak ditemukan");
  
        setInitialData(data);
        const resetData = formType === "ADUAN_SIBER" || formType === "LAYANAN_VA"
          ? { description: data.description || "", file_path: undefined }
          : data;
  
        form.reset(resetData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoadingFetch(false);
      }
    };
  
    if (STATIC_IDS[formType]) fetchData();
    else form.reset(defaultValues[formType]);
  }, [formType]);
  

  const handleRemoveFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    form.setValue("materi", updatedFiles);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
  
    try {
      // Mendapatkan CSRF token
      await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
  
      const id = STATIC_IDS[formType];
      const url =
        formType === "kegiatan"
          ? `${BACKEND_URL}/kegiatan`
        : formType === "PEDOMAN_TEKNIS"
        ? `${BACKEND_URL}/documents`
        : `${BACKEND_URL}/documents/${id}?_method=PUT`;
    
      if (["RFC_ID", "RFC_ENGLISH", "ADUAN_SIBER", "LAYANAN_VA"].includes(formType)) {
        data.name = formType; // Otomatis set properti name sesuai formType
      }
  
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "materi" && Array.isArray(value)) {
          value.forEach((file) => formData.append("materi[]", file));
        } else if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value);
        }
      });
  
      await axios({
        method: "post",
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
  
      alert(`${formType} berhasil disimpan!`);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
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
          defaultValue="RFC_ID"
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RFC_ID">RFC ID</SelectItem>
            <SelectItem value="RFC_ENGLISH">RFC English</SelectItem>
            <SelectItem value="ADUAN_SIBER">Aduan Siber</SelectItem>
            <SelectItem value="LAYANAN_VA">Layanan VA</SelectItem>
            <SelectItem value="PEDOMAN_TEKNIS">Pedoman Teknis</SelectItem>
            <SelectItem value="kegiatan">Kegiatan</SelectItem>
          </SelectContent>
        </Select>
        {loadingFetch ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {formType === "RFC_ID" && (
              <>
                <FormField
                  control={form.control}
                  name="file_path"
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

            {formType === "RFC_ENGLISH" && (
              <>
                <FormField
                  control={form.control}
                  name="file_path"
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

            {formType === "ADUAN_SIBER" && (
              <>
                <FormField
                  control={form.control}
                  name="description"
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
                  name="file_path"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gambar</FormLabel>
                      <FormControl>
                        <Input
                          type="file_path"
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

            {formType === "LAYANAN_VA" && (
              <>
                <FormField
                  control={form.control}
                  name="description"
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
                  name="file_path"
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

            {formType === "PEDOMAN_TEKNIS" && (
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
                  name="file_path"
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
      )}
      </div>
    </div>
  );
};

export default Dokumen;
