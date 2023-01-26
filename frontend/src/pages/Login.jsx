import React from "react";
import styles from "./styles/Login.module.css";
import kakaoBtn from '../assets/images/kakao_login_medium_wide.png';

export default function Login() {
  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>

        <div className={styles.title}>로그인 하기</div>
      </div>
      <div className={styles.logo}>zum:go</div>
        <img className={styles.kakaoBtn} src={kakaoBtn} alt="" />
    </div>
  );
}