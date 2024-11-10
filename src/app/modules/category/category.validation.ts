import { z } from "zod";

const categoryValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Category title is required" }),
    isDeleted: z.boolean().optional(),
  }),
});
const categoryUpdateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
export const categoryValidationSchemas = {
  categoryValidationSchema,
  categoryUpdateValidationSchema,
};
