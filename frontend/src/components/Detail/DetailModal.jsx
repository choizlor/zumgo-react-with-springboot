import React from "react";
import styles from "./DetailModal.module.css";

export default function DetailModal() {
  return (
    <div className={styles.body}>
      <span className={styles.title}>누구와 거래하셨나요?</span>
      <div className={styles.scrollbox}>
        <div className={styles.userbox}>
          <img
            src="https://sitem.ssgcdn.com/18/83/93/item/2097000938318_i1_1200.jpg"
            className={styles.userimg}
          />
          <span className={styles.username}>딸기우유 서녕</span>
        </div>
        <div className={styles.userbox}>
          <img
            src="https://sitem.ssgcdn.com/18/83/93/item/2097000938318_i1_1200.jpg"
            className={styles.userimg}
          />
          <span className={styles.username}>딸기우유 서녕</span>
        </div>
        <div className={styles.userbox}>
          <img
            src="https://sitem.ssgcdn.com/18/83/93/item/2097000938318_i1_1200.jpg"
            className={styles.userimg}
          />
          <span className={styles.username}>딸기우유 서녕</span>
        </div>
        <div className={styles.userbox}>
          <img
            src="https://sitem.ssgcdn.com/18/83/93/item/2097000938318_i1_1200.jpg"
            className={styles.userimg}
          />
          <span className={styles.username}>딸기우유 서녕</span>
        </div>
      </div>
    </div>
  );
}
