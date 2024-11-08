import { TReview } from "./review.interface";
import { Review } from "./review.model";

const addReview = async (payload: TReview) => {
  const result = await Review.create(payload);
  return { data: result };
};
const getProductReviews = async (id: string) => {
  const result = await Review.find({ product: id }).populate("user");
  return { data: result };
};

export const reviewServices = {
  addReview,
  getProductReviews,
};
