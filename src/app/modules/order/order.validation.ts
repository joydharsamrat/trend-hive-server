import { z } from "zod";

const billingInfoSchema = z.object({
  address: z.string({ required_error: "Address is required" }),
  city: z.string({ required_error: "City is required" }),
  state: z.string({ required_error: "State is required" }),
  zip: z
    .string({ required_error: "ZIP code is required" })
    .regex(/^\d{4,10}$/, { message: "ZIP code is invalid" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  name: z.string({ required_error: "Name is required" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^\d{10,15}$/, { message: "Phone number is invalid" }),
});

const productSchema = z.object({
  _id: z
    .string({ required_error: "Product ID is required" })
    .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid Product ID" }),
  name: z.string({ required_error: "Product name is required" }),
  description: z
    .string({ required_error: "Description is required" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  category: z
    .string({ required_error: "Category is required" })
    .regex(/^[a-fA-F0-9]{24}$/, {
      message: "Category must be a valid ObjectId",
    }),
  price: z
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be a positive number" }),
  image: z
    .string({ required_error: "Image is required" })
    .url({ message: "Image must be a valid URL" }),
  quantity: z
    .number({ required_error: "Quantity is required" })
    .int()
    .nonnegative({ message: "Quantity cannot be negative" }),
});

const cartItemSchema = z.object({
  product: productSchema,
  quantity: z
    .number({ required_error: "Quantity is required" })
    .int()
    .nonnegative({ message: "Quantity cannot be negative" }),
});

const orderValidationSchema = z.object({
  _id: z
    .string({ required_error: "Order ID is required" })
    .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid Order ID" }),
  billingInfo: billingInfoSchema,
  items: z.array(cartItemSchema),
  price: z
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be a positive number" }),
  user: z
    .string({ required_error: "User ID is required" })
    .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid User ID" }),
});

export const orderValidationSchemas = {
  orderValidationSchema,
};
