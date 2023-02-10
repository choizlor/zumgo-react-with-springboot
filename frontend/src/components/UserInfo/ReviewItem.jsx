import React from "react";
import styles from "./ReviewItem.module.css";

export default function ReviewItem({review}) {
  console.log(review)
  return (
    <div className={styles.body}>
      <div className={styles.writer}>냠냠이</div>
      <div className={styles.comment}>
        라이브에서 상품을 제대로 보여주셔서 언제나 믿고 구매합니다 ^^
      </div>
    </div>
  );
}
