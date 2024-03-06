import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loadind: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loadind = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      (state.loadind = false),
        (state.currentUser = action.payload),
        (state.error = null);
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loadind = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
