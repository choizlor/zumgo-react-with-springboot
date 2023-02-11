import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  userCode: 0,
  point: "",
  kakaoNickname: "",
  kakaoProfileImg: "",
}


let user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      // console.log('action.payload : ', action.payload)
      return action.payload;
    },
  },
  //초기화를 하고 싶은 state가 있는 slice마다 작성
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
});

export let { login, logout } = user.actions;
export default user;