import express from "express";
import { testRoutes } from "../modules/test/test.route";

const router = express.Router();

const moduleRoutes = [{ path: "/test", route: testRoutes }];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
