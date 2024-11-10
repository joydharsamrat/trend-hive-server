import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth("admin"), userControllers.handleGetUsers);

router.put("/make-admin", auth("admin"), userControllers.handleMakeAdmin);

router.delete("/", auth("admin"), userControllers.handleDeleteUser);

router.post(
  "/create-user/admin",
  auth("admin"),
  userControllers.handleCreateUser
);

export const userRoutes = router;
