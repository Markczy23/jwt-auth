import Sequelize from "sequelize";
import dbConfig from "../config/db.config";
import userModel from "./user.model.js";
import roleModel from "./role.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
});

const db = {};
