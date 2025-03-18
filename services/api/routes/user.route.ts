import { Router } from "express";
import * as UserController from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", UserController.getAllUsers);
userRoutes.get("/:id", UserController.getUserById);
userRoutes.post("/", UserController.createUser);
userRoutes.put("/:id", UserController.updateUser);
userRoutes.delete("/:id", UserController.deleteUser);

export default userRoutes;
