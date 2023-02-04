import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    kakaoNickname: "",
    userCode: "",
    kakaoId: "",
  },
  reducers: {
    login(state, action) {
      // console.log('action.payload : ', action.payload)
      return action.payload;
    },
  },
});

export let { login } = user.actions;

export default user.reducer;