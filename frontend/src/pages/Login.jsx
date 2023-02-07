import React from "react";
import styles from "./styles/Login.module.css";
import kakaoBtn from "../assets/images/kakao_login_medium_wide.png";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();

  const REST_API_KEY = 'b875d5c09e310962a4402f90c93aa19c';
  // console.log(REST_API_KEY)

  const REDIRECT_URI = "https://i8c110.p.ssafy.io/oauth";

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-gray-100" onClick={() => {navigate(-1)}} />
        <div className={styles.title}>로그인 하기</div>
      </div>
      <div className={styles.logo}>zum:go</div>
      
      {/* 로그인 버튼을 누르면 인가코드를 발급 받기 */}
      <a href={KAKAO_AUTH_URI}>
        <img className={styles.kakaoBtn} src={kakaoBtn} />
      </a>
    </div>
  );
}
