import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    userCode: "",
    point: "",
    kakaoNickname: "",
    kakaoProfileImg: "",
  },
  reducers: {
    login(state, action) {
      // console.log('action.payload : ', action.payload)
      return action.payload;
    },
    logout(action) {
      window.localStorage.removeItem('token')
      return action.payload;
    },
  },
});

export default configureStore({
  reducer: {
    user: user.reducer,
  },
});

export let { login, logout } = user.actions;
