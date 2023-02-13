import React from "react";
import styles from "./HomeBanner2.module.css";

export default function HomeBanner() {

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
