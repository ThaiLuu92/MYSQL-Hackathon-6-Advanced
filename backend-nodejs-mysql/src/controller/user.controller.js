import {
    getData,
  } from "../utils/util.js";

  export default class UserController {

    async getAllUser(req, res) {
        try {
          const users = await getData("User");
          res.status(200).json(users);
        } catch (error) {
          console.log(111, error);
          res.status(500).json({ error: "Server Error" });
        }
      }

  }