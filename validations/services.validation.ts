import { z } from "zod";

const servicesValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export { servicesValidation };
