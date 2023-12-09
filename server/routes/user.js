import express from "express";
import { signUp, login, logout, getUserDetails } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/signup").post(signUp);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getUserDetails);

export default router;
