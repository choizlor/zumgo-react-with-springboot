import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomeBanner.module.css";

export default function HomeBanner() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  return (
    <div className={styles.box}>
      <p className={styles.font}>중고 거래,</p>
      <p className={styles.font}>줌고로 생생하게!</p>
      {!token ? (
        <button
          className={styles.loginbtn}
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인하기
        </button>
      ) : null}
    </div>
  );
}
