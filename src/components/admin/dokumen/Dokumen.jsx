"use client";

import { z } from "zod";
import BackButton from "@/components/admin/BackButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Skema validasi form untuk dokumen
const documentSchema = z.object({
  documentName: z.string().min(1, { message: "Nama dokumen belum terisi!" }),
  file: z.any().refine((file) => file instanceof File, { message: "Masukkan file dokumen!" }),
});

const Dokumen = () => {
  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      documentName: "",
      file: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    if (data.file) {
      console.log("File name:", data.file.name);
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
              name="documentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Dokumen</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan Nama Dokumen" {...field} />
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
                  <FormLabel>File Dokumen</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf, .doc, .docx, .txt, .ppt, .pptx"
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

export default Dokumen;
