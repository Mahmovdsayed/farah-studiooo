import { allowedImageTypes } from "@/constant/statics";
import z from "zod";

const educationValidation = z.object({
  schoolName: z.string().min(1, { message: "School name is required" }),
  faculty: z.string().optional(),
  from: z
    .preprocess((val) => {
      if (typeof val === "string" && val) {
        const date = new Date(val);
        return isNaN(date.getTime()) ? null : date;
      }
      return val;
    }, z.date())
    .optional()
    .nullable(),
  to: z.preprocess((val) => {
    if (typeof val === "string" && val) {
      const date = new Date(val);
      return isNaN(date.getTime()) ? null : date;
    }
    return val;
  }, z.date().optional()),
  status: z
    .enum(["Currently Studying", "Graduated"])
    .default("Currently Studying"),
  description: z.string().optional(),
  gpa: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0).max(4).optional()
  ),
  schoolImage: z
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

export { educationValidation };
