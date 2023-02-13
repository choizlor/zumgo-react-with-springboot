import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomeBanner.module.css";

export default function HomeBanner() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  return (
    <div className={styles.body}>
      <div className={styles.top}>
        <div className={styles.topleft}></div>
        <div className={styles.topright}>
          <div className={styles.font}>
            <div className={styles.fontchild}>중고 거래,</div>
          </div>
          <div className={styles.font}>
            <div className={styles.fontchild}>줌고로 생생하게!</div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}></div>
    </div>
  );
}
