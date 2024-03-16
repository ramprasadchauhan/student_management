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
    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  },
  { timestamp: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
