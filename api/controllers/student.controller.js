import Student from "../models/student.model.js";
import { errorHandler } from "../utils/error.js";

export const student = async (req, res, next) => {
  try {
    if (
      !req.body.name ||
      !req.body.parentName ||
      !req.body.gender ||
      !req.body.acadmicYear ||
      !req.body.schoolName
    ) {
      next(errorHandler(500, "All fields are required"));
    }
    const newStudent = {
      name: req.body.name,
      parentName: req.body.parentName,
      gender: req.body.gender,
      acadmicYear: req.body.acadmicYear,
      schoolName: req.body.schoolName,
    };
    const student = await Student.create(newStudent);
    return res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({});
    return res.status(200).json({
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return next(errorHandler(400, "Student not found"));
    }
    return res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (
      !req.body.name ||
      !req.body.parentName ||
      !req.body.gender ||
      !req.body.acadmicYear ||
      !req.body.schoolName
    ) {
      return next(errorHandler(500, "All fields are required"));
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          parentName: req.body.parentName,
          gender: req.body.gender,
          acadmicYear: req.body.acadmicYear,
          schoolName: req.body.schoolName,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Student update successfully",
      updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Student.findByIdAndDelete(id);
    if (!result) {
      return next(errorHandler(404, "Student not found"));
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
};
