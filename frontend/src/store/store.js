import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import FriendSlice from "./FriendSlice";

const store = configureStore({
  reducer: {
    token: tokenSlice,
    friend: FriendSlice,
  },
});

export default store;
