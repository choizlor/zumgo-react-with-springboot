import React from "react";
import styles from "./styles/Login.module.css";
import kakaoBtn from "../assets/images/kakao_login_medium_wide.png";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";


export default function Login() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  console.log(REST_API_KEY)

  const REDIRECT_URI = "http://localhost:3000/oauth";

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-gray-100" />
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
