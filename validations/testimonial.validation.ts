import { z } from "zod";

const testimonialValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  rating: z.string().min(1, { message: "Rating is required" }),
});

export { testimonialValidation };
