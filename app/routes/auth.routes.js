import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExist,
} from "../middlewares/index.js";

const router = express.Router();

router.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExist],
  signup
);

router.post("/signin", signin);

export default router;
