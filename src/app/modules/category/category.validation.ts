import { z } from "zod";

const categoryValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Category title is required" }),
  }),
});
export const categoryValidationSchemas = {
  categoryValidationSchema,
};
