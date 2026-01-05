import jwt from "jsonwebtoken";
import db from "../config/db.config.js";

process.loadEnvFile("../../.env");
const secret = process.env.JWT_SECRET;

const { user: User, role: Role } = db;

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secret);
    req.userId = decoded.id;
    const user = await User.findByPk(req.userId);
    if (!user) {
      res.status(401).json({ message: "Unauthorized!" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    const adminRole = roles.find((role) => role.name === "admin");
    if (adminRole) {
      next();
    } else {
      res.status(403).json({ message: "Requires Admin Role!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    const user = User.findByPk(req.userId);
    const roles = user.getRoles();
    const modRole = roles.find((role) => role.name === "moderator");
    if (modRole) {
      next();
    } else {
      res.status(403).json({ message: "Requires Moderator Role!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isAdminOrModerator = async (req, res, next) => {
  try {
    const user = User.findByPk(req.userId);
    const roles = user.getRoles();
    const hasRole = roles.some((role) =>
      ["admin", "moderator"].includes(role.name)
    );
    if (hasRole) {
      next();
    } else {
      res.status(403).json({ message: "Requires Admin or Moderator Role!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
