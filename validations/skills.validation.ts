import z from "zod";

const skillsValidationSchema = z.object({
  name: z.string().min(1, { message: "Skill name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  proficiency: z
    .enum(["Beginner", "Intermediate", "Advanced", "Expert"])
    .default("Beginner"),
});

export { skillsValidationSchema };
