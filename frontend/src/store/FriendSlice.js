import { createSlice } from "@reduxjs/toolkit";

const FriendSlice = createSlice({
  name: "friend",
  initialState: {
    dost: "",
    id: "",
  },
  reducers: {
    naming: (state, action) => {
      console.log("the previous state is-> ", state);
      console.log("the action received is -> ", action);
      console.log("the payload is --> ", action.payload);
      console.log("i got called yarrr!");
      state.dost = action.payload;
    },

    idding: (state, action) => {
      console.log("the previous state is-> ", state);
      console.log("the action received is -> ", action);
      console.log("the payload is --> ", action.payload);
      console.log("i got called yarrr!");
      state.id = action.payload;
    },
  },
});

export const { naming, idding } = FriendSlice.actions;
export default FriendSlice.reducer;
