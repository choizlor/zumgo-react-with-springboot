import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomeBanner.module.css";

export default function HomeBanner() {
  const navigate = useNavigate();
  return (
    <div className={styles.body}>
      <div className={styles.leftbox}>
        <div className={styles.font}>중고 거래,</div>
        <div className={styles.font}>줌고로 생생하게!</div>
        <button
          className={styles.loginbtn}
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인하기
        </button>
      </div>
      <div className={styles.rightbox}></div>
    </div>
  );
}
