"use client";

import { useState } from "react";
import BackButton from "@/components/admin/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

// Skema validasi form untuk masing-masing opsi
const schemas = {
  berita: z.object({
    title: z.string().min(1, { message: "Judul berita belum terisi!" }),
    category: z.string().min(1, { message: "Kategori berita belum dipilih!" }),
    body: z.string().min(1, { message: "Isi berita belum terisi!" }),
    photo: z.any().refine((file) => file instanceof File, { message: "Masukkan foto berita!" }),
    date: z.date({ message: "Tentukan tanggal berita!" }),
  }),
  profil: z.object({
    body: z.string().min(1, { message: "Deskripsi profil organisasi belum terisi!" }),
    videoLink: z.string().url({ message: "Pastikan link video benar!" }),
  }),
  visi: z.object({
    body: z.string().min(1, { message: "Masukkan visi organisasi!" }),
  }),
  misi: z.object({
    body: z.string().min(1, { message: "Masukkan misi organisasi!" }),
  }),
};

const Artikel = () => {
  const [formType, setFormType] = useState("berita");

  const form = useForm({
    resolver: zodResolver(schemas[formType]),
    defaultValues: {
      title: "",
      category: "",
      body: "",
      photo: null,
      date: null,
      videoLink: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    if (data.photo) {
      console.log("Photo file:", data.photo.name);
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

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-[240px] pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih tanggal</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit">
                  Upload Berita
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
                  name="videoLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Video</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan URL Video" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Upload</Button>
              </>
            )}

            {formType === "visi" && (
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

                <Button type="submit">upload</Button>
              </>
              
            )}

            {formType === "misi" && (
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
                
                <Button type="submit">upload</Button>
              </>
              
            )}
            
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Artikel;
