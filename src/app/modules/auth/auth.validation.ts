import { z } from "zod";

const userSignUpValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email address must be valid !" }),
    password: z.string({ required_error: "Password is required" }),
    role: z.enum(["user", "admin"]).optional(),
  }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email address must be valid !" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});

export const authValidationSchemas = {
  userSignUpValidationSchema,
  userLoginValidationSchema,
  refreshTokenValidationSchema,
};
