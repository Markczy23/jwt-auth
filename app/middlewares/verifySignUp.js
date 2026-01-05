import db from "../config/db.config.js";

const { ROLES, user: User } = db;

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const userByUsername = await User.findOne({
      where: { username: req.body.username },
    });
    if (userByUsername) {
      return res.status(400).json({ message: "Username already in use!" });
    }

    const userByEmail = await User.findOne({
      where: { email: req.body.email },
    });
    if (userByEmail) {
      return res.status(400).json({ message: "Email already in use!" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkRolesExist = (req, res, next) => {
  if (req.body.roles) {
    for (const role in req.body.roles) {
      if (!ROLES.includes(role)) {
        return res
          .status(400)
          .json({ message: `Role ${role} does not exist!` });
      }
    }
  }
  next();
};
