import express from "express";
import {
  getStudents,
  student,
  getOneStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/create", student);
router.get("/getstudents", getStudents);
router.get("/getonestudent/:studentId", getOneStudent);
router.put("/updatestudent/:studentId", updateStudent);
router.delete("/deletestudent/:studentId", deleteStudent);

export default router;
