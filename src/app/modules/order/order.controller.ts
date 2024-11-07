import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderServices } from "./order.service";

const handleInitiatePayment = catchAsync(async (req, res) => {
  const result = await orderServices.createOrder(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "payment initiated successfully",
    data: result,
  });
});

const handlePaymentSuccess = catchAsync(async (req, res) => {
  const result = await orderServices.orderSuccess(req.body);
});

export const orderControllers = {
  handleInitiatePayment,
  handlePaymentSuccess,
};
