import z from "zod";

const signinValidation = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email must not exceed 100 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must not exceed 100 characters" }),
});

export { signinValidation };
