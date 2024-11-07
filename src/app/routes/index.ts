import express from "express";
import { categoryRoutes } from "../modules/category/category.route";
import { productRoutes } from "../modules/product/product.route";
import { authRoutes } from "../modules/auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/categories", route: categoryRoutes },
  { path: "/products", route: productRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
