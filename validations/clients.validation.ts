import { allowedImageTypes } from "@/constant/statics";
import z from "zod";

const clientValidation = z.object({
  name: z.string().min(1, { message: "Client name is required" }),
  url: z.string().min(1, { message: "Client url is required" }),
  description: z.string().optional(),
  clientImage: z
    .instanceof(File)
    .refine((file) => allowedImageTypes.includes(file.type), {
      message: "Only PNG, JPEG, JPG, and GIF files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .optional()
    .nullable(),
});

export { clientValidation };
