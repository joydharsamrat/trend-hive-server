import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidationSchemas } from "./order.validation";
import { orderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/create-order",
  validateRequest(orderValidationSchemas.orderValidationSchema),
  orderControllers.handleInitiatePayment
);
router.post("/success", orderControllers.handlePaymentSuccess);
router.post("/fail", orderControllers.handlePaymentFail);

export const orderRoutes = router;
