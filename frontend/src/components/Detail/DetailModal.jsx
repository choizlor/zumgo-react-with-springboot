import React from "react";
import styles from "./DetailModal.module.css";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function DetailModal({setModalOpen}) {
  const closeModal = () => {
    setModalOpen(false)
  }
  
  return (
    <div className={styles.body}>
      <XMarkIcon onClick={closeModal}/>
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
