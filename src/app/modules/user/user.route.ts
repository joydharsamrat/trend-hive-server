import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth("admin"), userControllers.handleGetUsers);

router.put("/make-admin", auth("admin"), userControllers.handleMakeAdmin);

router.delete("/", auth("admin"), userControllers.handleDeleteUser);

export const userRoutes = router;
