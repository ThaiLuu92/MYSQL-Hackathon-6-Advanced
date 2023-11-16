import express from "express";
import TaskController from "../controller/task.controller.js";

const taskController = new TaskController()
const taskRouter = express.Router();

// Lấy tất cả các danh mục
taskRouter.get("/", taskController.getAllTask);

// Lấy danh mục theo id
taskRouter.get("/:id", taskController.getTaskById);

// Tạo danh mục
taskRouter.post("/", taskController.createTask);

// Sửa danh mục
taskRouter.put("/:id", taskController.editTask);

// Xóa danh mục
taskRouter.delete("/:id", taskController.deleteTask);


export default taskRouter;