import { createSlice } from "@reduxjs/toolkit";

// as of now building the brute force approach like only one user has entered and now cannot logout !!

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
  },
  reducers: {
    setting: (state, action) => {
      console.log("the previous state is-> ", state);
      console.log("the action received is -> ", action);
      console.log("the payload is --> ", action.payload);
      console.log("i got called yarrr!");
      state.token = action.payload;
    },
  },
});

export const { setting } = tokenSlice.actions;
export default tokenSlice.reducer;
