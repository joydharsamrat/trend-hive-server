import express from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidationSchemas } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",

  validateRequest(authValidationSchemas.userSignUpValidationSchema),
  authControllers.handleUserSignUp
);

router.post(
  "/login",
  validateRequest(authValidationSchemas.userLoginValidationSchema),
  authControllers.handleUserLogin
);

export const authRoutes = router;
