import { z } from "zod";

const userSignUpValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email address must be valid !" }),
  password: z.string({ required_error: "Password is required" }),
  phone: z.string({ required_error: "Phone is required" }),
  role: z.enum(["user", "admin"]).optional(),
  address: z.string({ required_error: "Address is required" }),
});

const userLoginValidationSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email address must be valid !" }),
  password: z.string({ required_error: "Password is required" }),
});
export const authValidationSchemas = {
  userSignUpValidationSchema,
  userLoginValidationSchema,
};
