import express from "express";
import {
  createTask,
  getTask,
  editTask,
  deleteTask,
  changeStatus,
  taskDetails,
} from "../controllers/todo.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/addtask").post(isAuthenticated, createTask);

router.route("/gettask").get(isAuthenticated, getTask);

router.route("/changestatus/:id").get(isAuthenticated, changeStatus);

router.route("/taskdetail/:id").get(isAuthenticated, taskDetails);

router.route("/edittask/:id").put(isAuthenticated, editTask);

router.route("/deletetask/:id").delete(isAuthenticated, deleteTask);

export default router;
