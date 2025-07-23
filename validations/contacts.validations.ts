import { allowedPlatforms } from "@/models/contacts.model";
import z from "zod";

const contactValidation = z.object({
  platform: z.enum(allowedPlatforms).default("other"),
  url: z.string().min(5).url(),
});

export { contactValidation };
