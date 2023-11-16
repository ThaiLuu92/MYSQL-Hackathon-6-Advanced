import express from "express";
import UserController from "../controller/user.controller.js";

const userController = new UserController()
const userRouter = express.Router();

// Lấy tất cả các danh mục
userRouter.get("/", userController.getAllUser);

export default userRouter;