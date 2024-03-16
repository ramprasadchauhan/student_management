import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStudent: null,
  error: null,
  loading: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudentStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    addStudentSuccess: (state, action) => {
      state.currentStudent = action.payload;
      state.loading = false;
      state.error = null;
    },

    addStudentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = false;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentStudent = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStudentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteStudentSuccess: (state) => {
      state.currentStudent = null;
      state.loading = false;
      state.error = null;
    },
    deleteStudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addStudentStart,
  addStudentSuccess,
  addStudentFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStudentStart,
  deleteStudentSuccess,
  deleteStudentFailure,
} = studentSlice.actions;
export default studentSlice.reducer;
