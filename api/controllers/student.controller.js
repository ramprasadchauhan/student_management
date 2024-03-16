import Student from "../models/student.model.js";
import { errorHandler } from "../utils/error.js";

export const student = async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.parentName ||
    !req.body.gender ||
    !req.body.acadmicYear ||
    !req.body.schoolName
  ) {
    return next(errorHandler(500, "All fields are required"));
  }
  const newStudent = new Student({
    ...req.body,
  });
  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
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
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return next(errorHandler(400, "Student not found"));
    }
    return res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  const { studentId } = req.params;
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
      studentId,
      {
        $set: {
          name: req.body.name,
          parentName: req.body.parentName,
          gender: req.body.gender,
          acadmicYear: req.body.acadmicYear,
          schoolName: req.body.schoolName,
          profilePhoto: req.body.profilePhoto,
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
    const { studentId } = req.params;
    await Student.findByIdAndDelete(studentId);
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
};
