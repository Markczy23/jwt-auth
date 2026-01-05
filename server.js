import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
// import authRoutes from "./app/routes/auth.routes.js";
// import userRoutes from "./app/routes/user.routes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the JWT API." });
});

// app.use("/api/auth", authRoutes);
// app.use("/api/test", userRoutes);

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(() => {
  console.log("Database synced!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
