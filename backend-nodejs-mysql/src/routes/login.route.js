import express from "express";
import LoginController from "../controller/login.controller.js";

const loginController = new LoginController()
const loginRouter = express.Router();

// Lấy tất cả các danh mục
loginRouter.post("/", loginController.loginUser);

export default loginRouter;