import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import studentRoute from "./routes/student.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });
const __dirname = path.resolve();

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
