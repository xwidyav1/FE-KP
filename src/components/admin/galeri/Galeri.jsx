"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/admin/BackButton";
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
import { Textarea } from "@/components/ui/textarea";

// Skema validasi form untuk galeri
const gallerySchema = z.object({
  activityName: z.string().min(1, { message: "Nama kegiatan belum terisi!" }),
  activityDate: z.date({ message: "Tentukan tanggal kegiatan!" }),
  image: z.any().refine((file) => file instanceof File, { message: "Masukkan gambar!" }),
});

const Galeri = () => {
  const [formType] = useState("galeri");

  const form = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      activityName: "",
      activityDate: null,
      image: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    if (data.image) {
      console.log("Image file:", data.image.name);
    }
  };

  return (
    <div>
      <BackButton text="Kembali" link="/admin" />
      <div className="flex flex-col gap-y-[2vw]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="activityName"
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
              name="activityDate"
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
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Galeri;
