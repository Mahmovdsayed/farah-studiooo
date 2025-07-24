import z from "zod";

const courseValidationSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  description: z.string().optional(),
  date: z
    .preprocess((val) => {
      if (typeof val === "string" && val) {
        const date = new Date(val);
        return isNaN(date.getTime()) ? null : date;
      }
      return val;
    }, z.date())
    .optional()
    .nullable(),
  certificateURL: z.url().min(1, { message: "certificateURL is required" }),
});

export { courseValidationSchema };
