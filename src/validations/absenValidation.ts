import { z } from "zod";

export const AbsenValidation = z.object({
  sesi_id: z.string().min(1, "Session ID is required"),
  location_lat: z.string().min(1, "Latitude is required"),
  location_lng: z.string().min(1, "Longitude is required"),
});