import express from "express";
import {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
} from "../controllers/user.controller.js";
import { authJwt } from "../middlewares/index.js";

const router = express.Router();

router.get("/all", allAccess);

router.get("/user", [authJwt.verifyToken], userBoard);

router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], adminBoard);

router.get(
  "/moderator",
  [authJwt.verifyToken, authJwt.isModerator],
  moderatorBoard
);

export default router;
