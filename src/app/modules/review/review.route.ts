import express from "express";
import auth from "../../middlewares/auth";
import { reviewControllers } from "./review.controller";

const router = express.Router();

router.post("/add-review", auth("user"), reviewControllers.handleAddReview);
router.get("/:id", reviewControllers.handleGetProductReviews);

export const reviewRoutes = router;
