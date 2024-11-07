import { z } from "zod";

const createUserValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email address must be valid !" }),
  password: z.string({ required_error: "Password is required" }),
  role: z.enum(["user", "admin"]).optional(),
  isDeleted: z.boolean().optional(),
});

const updateUserValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email address must be valid !" })
    .optional(),
  password: z.string({ required_error: "Password is required" }).optional(),
  role: z.enum(["user", "admin"]).optional().optional(),
  isDeleted: z.boolean().optional(),
});
export const userValidationSchemas = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
