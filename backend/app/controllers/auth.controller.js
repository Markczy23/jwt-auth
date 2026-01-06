import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { role: Role, user: User } = db;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.loadEnvFile(join(__dirname, "../../.env"));
const secretKey = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    //role default set as user when signing up
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const userRole = await Role.findOne({ where: { name: "user" } });
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    user.setRoles([userRole]);

    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({
      where: { username },
      include: { model: Role, as: "roles" },
    });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ accessToken: null, message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: "1d",
    });

    const authorities = user.roles.map(
      (role) => `ROLE_${role.name.toUpperCase()}`
    );

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
