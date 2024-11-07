import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidationSchemas } from "./category.validation";
import { categoryControllers } from "./category.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-category",
  auth("admin"),
  validateRequest(categoryValidationSchemas.categoryValidationSchema),
  categoryControllers.handleCreateCategory
);

router.get("/", categoryControllers.handleGetAllCategories);

export const categoryRoutes = router;
