import { z } from "zod";

const testValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
export const testValidationSchemas = {
  testValidationSchema,
};
