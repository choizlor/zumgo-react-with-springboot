import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice.js";

export default function Oauth() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});

  // params로 받은 인가 코드를 code 변수에 저장
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code, "🎄");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // 토큰 axios 요청
        const res = await axios.get(`api/oauth/token?code=${code}`);
        const token = res.headers.authorization;
        console.log("oauth 통과했음");

        // 받아온 토큰을 로컬 스토리지에 token으로 저장
        window.localStorage.setItem("token", token);

        
         await axios.get("http://i8c110.p.ssafy.io/api/me", {
            headers: {
              Authorization: token,
            },
          });
          res.then((user) => {
            console.log("로그인된 유저 : ", user.data.user);
            dispatch(
              login({
                userCode: user.data.user.userCode,
                potnt: user.data.user.point,
                kakaoNickname: user.data.user.kakaoNickname,
                kakaoProfileImg: user.data.user.kakaoProfileImg,
              })
            );

            setUserInfo(user.data.user);
            console.log("oauth 안에서 유저정보 넣기 성공");
          });

        // home으로 이동
        navigate("/");
      } catch (e) {
        console.error(e);
        navigate("/");
      }
    })();
  }, []);

  return <div></div>;
}
