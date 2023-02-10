import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';

let user = createSlice({
  name: "user",
  initialState: {
    userCode: 0,
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
      // 토큰 삭제 해주기
      window.localStorage.removeItem('token')
      // 최근 검색어 삭제
      window.localStorage.removeItem('recents')
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
