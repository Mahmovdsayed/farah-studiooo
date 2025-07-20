import { allowedImageTypes } from "@/constant/statics";
import z from "zod";

const workValidationSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  positionName: z.string().min(1, { message: "Position name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  from: z.preprocess((val) => {
    if (typeof val === "string" && val) {
      const date = new Date(val);
      return isNaN(date.getTime()) ? null : date;
    }
    return val;
  }, z.date()),

  to: z.preprocess((val) => {
    if (typeof val === "string" && val) {
      const date = new Date(val);
      if (isNaN(date.getTime())) return null;
      return isNaN(date.getTime()) ? null : date;
    }
    return val;
  }, z.date().optional().nullable()),

  current: z.boolean().default(false),
  employmentType: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
    "Remote",
    "Temporary",
    "Casual",
    "Volunteer",
    "Self-Employed",
    "Apprenticeship",
    "Other",
  ]),
  companyImage: z
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

export { workValidationSchema };
