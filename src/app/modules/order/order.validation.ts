import { z } from "zod";

const billingInfoSchema = z.object({
  address: z.string({ required_error: "Address is required" }),
  city: z.string({ required_error: "City is required" }),
  state: z.string({ required_error: "State is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  name: z.string({ required_error: "Name is required" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^\d{10,15}$/, { message: "Phone number is invalid" }),
});

const orderValidationSchema = z.object({
  body: z.object({
    billingInfo: billingInfoSchema,

    price: z
      .number({ required_error: "Price is required" })
      .positive({ message: "Price must be a positive number" }),
    user: z
      .string({ required_error: "User ID is required" })
      .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid User ID" }),
  }),
});

export const orderValidationSchemas = {
  orderValidationSchema,
};
