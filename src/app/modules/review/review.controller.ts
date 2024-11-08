import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.service";

const handleAddReview = catchAsync(async (req, res) => {
  const result = await reviewServices.addReview(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Review added successfully",
    data: result,
  });
});

const handleGetProductReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewServices.getProductReviews(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Reviews retrieved successfully",
    data: result,
  });
});

export const reviewControllers = {
  handleAddReview,
  handleGetProductReviews,
};
