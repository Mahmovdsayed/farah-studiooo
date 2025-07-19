import z from "zod";

const toolsValidation = z.object({
  name: z.string().min(1, { message: "Tool name is required" }),
});

export { toolsValidation };
