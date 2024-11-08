import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    user: { type: Schema.ObjectId, required: true, ref: "user" },
    product: { type: Schema.ObjectId, required: true, ref: "Product" },
    feedback: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Review = model<TReview>("Review", reviewSchema);
