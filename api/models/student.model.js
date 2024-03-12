import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    acadmicYear: {
      type: Number,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
