import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, fullName, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    !fullName ||
    username === "" ||
    password === "" ||
    email === "" ||
    fullName === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = await User({
    username,
    email,
    password: hashedPassword,
    fullName,
  });
  try {
    await newUser.save();
    res.json("signup successfully");
  } catch (error) {
    next(error);
  }
};
