import {
    getData,
    getDataById,
    insertData,
    deleteData,
    editData
  } from "../utils/util.js";

  export default class TaskController {

    async getAllTask(req, res) {
        try {
          const tasks = await getData("Task");
          res.status(200).json(tasks);
        } catch (error) {
          console.log(111, error);
          res.status(500).json({ error: "Server Error" });
        }
      }

      async getTaskById(req, res) {
        try {
          const tasks = await getDataById("Task", req.params.id);
          res.status(200).json(tasks);
        } catch (error) {
          console.log(111, error);
          res.status(500).json({ error: "Server Error" });
        }
      }

      async createTask(req, res) {
        try {
          const tasks = await insertData("Task", req.body);
          res.status(200).json(tasks);
        } catch (error) {
          console.log(111, error);
          res.status(500).json({ error: "Server Error" });
        }
      }

      async editTask(req, res) {
        try {
          const tasks = await editData("Task", req.params.id, req.body);
          res.status(200).json(tasks);
        } catch (error) {
          console.log(111, error);
          res.status(500).json({ error: "Server Error" });
        }
      }

      async deleteTask(req, res) {
        try {
          const tasks = await deleteData("Task", req.params.id);
          res.status(200).json(tasks);
        } catch (error) {
          console.log(111, error);
          res.status(500).json({ error: "Server Error" });
        }
      }

  }