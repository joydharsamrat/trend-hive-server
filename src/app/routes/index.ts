import express from "express";
import { categoryRoutes } from "../modules/category/category.route";
import { productRoutes } from "../modules/product/product.route";
import { authRoutes } from "../modules/auth/auth.route";
import { cartRoutes } from "../modules/cart/cart.route";
import { orderRoutes } from "../modules/order/order.route";
import { userRoutes } from "../modules/user/user.route";
import { reviewRoutes } from "../modules/review/review.route";

const router = express.Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/categories", route: categoryRoutes },
  { path: "/products", route: productRoutes },
  { path: "/cart", route: cartRoutes },
  { path: "/order", route: orderRoutes },
  { path: "/users", route: userRoutes },
  { path: "/reviews", route: reviewRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
