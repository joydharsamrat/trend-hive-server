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
  await orderServices.orderSuccess(req.body);
  res.redirect("https://trend-hive-neon.vercel.app/user/success");
});

const handlePaymentFail = catchAsync(async (req, res) => {
  res.redirect("https://trend-hive-neon.vercel.app/user/failed");
});

const handleGetOrdersForUser = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const result = await orderServices.getOrdersForUser(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

export const orderControllers = {
  handleInitiatePayment,
  handlePaymentSuccess,
  handlePaymentFail,
  handleGetOrdersForUser,
};
