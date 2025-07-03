import { z } from "zod";

export const AbsenGenerateValidation = z.object({
  name: z.string().min(1, "Name is required"),
  date_start: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date_start format",
  }),
  date_end: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date_end format",
  }),
  location_lat: z.coerce.number().min(-90).max(90),
  location_lng: z.coerce.number().min(-180).max(180),
  notes: z.string().optional(),
}).refine(
  (data) => new Date(data.date_end) >= new Date(data.date_start),
  {
    path: ["date_end"],
    message: "Tanggal selesai tidak boleh lebih awal dari tanggal mulai",
  
});