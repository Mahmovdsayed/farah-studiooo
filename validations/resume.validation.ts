import z from "zod";

const resumeValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  resumeURL: z.string().url("Invalid URL").min(1, "Resume URL is required"),
  isPublic: z.boolean().optional(),
});

export { resumeValidationSchema };
