import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
