import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomeBanner1.module.css"

export default function HomeBanner() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  return (
    <div className={styles.body}>
      <div className={styles.top}>
        <div className={styles.topleft}>
          <div className={styles.font}><div className={styles.fontchild}>제대로 보고</div></div>
          <div className={styles.font}><div className={styles.fontchild}>제대로 사-자.</div></div>
        </div>
        <div className={styles.topright}></div>
      </div>
      <div className={styles.bottom}>
        <div
          className={styles.loginbtn}
          onClick={() => {
            navigate("/login");
          }}
          style={token ? { visibility: "hidden" } : { visibility: "visible" }}
        >
          <div>로그인하기</div>
        </div>
      </div>
    </div>
  );
}
