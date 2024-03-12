import express from "express";
import {
  getStudents,
  student,
  getOneStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", student);
router.get("/", getStudents);
router.get("/:id", getOneStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
