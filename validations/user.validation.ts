import { allowedImageTypes } from "@/constant/statics";
import z from "zod";

const userValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
 
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(30, { message: "Username must not exceed 30 characters" }),
  about: z
    .string()
    .max(500, { message: "About must be less than 500 characters" })
    .optional(),
  birthday: z.string().optional(),
  country: z
    .string()
    .max(50, { message: "Country must not exceed 50 characters" })
    .optional(),
  city: z
    .string()
    .max(50, { message: "City must not exceed 50 characters" })
    .optional(),
  positionName: z
    .string()
    .max(50, { message: "Position name must not exceed 50 characters" })
    .optional(),
  phone: z
    .string()
    .max(50, { message: "Phone must not exceed 50 characters" })
    .optional(),
  resetPasswordToken: z.string().optional(),
  resetPasswordExpires: z.date().optional(),
  aiContent: z
    .array(
      z.object({
        description: z
          .string()
          .min(1, { message: "Description cannot be empty" })
          .optional(),
      })
    )
    .optional(),
  avatar: z
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

export { userValidation };
