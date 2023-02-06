import { configureStore } from "@reduxjs/toolkit";
import hostSlice from "./hostSlice";
import userSlice from "./userSlice"

export default configureStore({
    reducer: {
      user: userSlice,
      hostStatus: hostSlice,
    },
  });