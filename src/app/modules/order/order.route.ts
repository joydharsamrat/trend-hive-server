import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidationSchemas } from "./order.validation";
import { orderControllers } from "./order.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-order",
  auth("user"),
  validateRequest(orderValidationSchemas.orderValidationSchema),
  orderControllers.handleInitiatePayment
);
router.post("/success", orderControllers.handlePaymentSuccess);

router.post("/fail", orderControllers.handlePaymentFail);

router.get("/user", auth("user"), orderControllers.handleGetOrdersForUser);

router.get("/admin", auth("admin"), orderControllers.handleGetAllOrders);
router.put(
  "/status/admin/:id",
  auth("admin"),
  orderControllers.handleUpdateOrderStatus
);

export const orderRoutes = router;
