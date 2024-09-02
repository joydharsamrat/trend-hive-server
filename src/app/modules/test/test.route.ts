import express from "express";
import { testControllers } from "./test.controller";
import validateRequest from "../../middlewares/validateRequest";
import { testValidationSchemas } from "./test.validation";

const router = express.Router();

router.post(
  "/create-test",
  validateRequest(testValidationSchemas.testValidationSchema),
  testControllers.handleCreateTest
);

export const testRoutes = router;
