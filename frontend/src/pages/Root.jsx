import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userSlice.js";
import axios from "axios";

export default function Root() {
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    // 유저 정보를 불러오는 api
    if (!token) {
      return
    }
    
    axios
      .get("http://i8c110.p.ssafy.io/api/me", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(
          login({
            userCode: res.data.user.userCode,
            point: res.data.user.point,
            kakaoNickname: res.data.user.kakaoNickname,
            kakaoProfileImg: res.data.user.kakaoProfileImg,
          })
        );
      });
  }, [token]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
