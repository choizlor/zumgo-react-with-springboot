import React from "react";
import styles from "./ReviewItem.module.css";

export default function ReviewItem({review}) {
  console.log(review)
  return (
    <div className={styles.body}>
      <div className={styles.writer}>{review.buyer.kakaoNickname}</div>
      <div className={styles.comment}>{review.review}</div>
    </div>
  );
}
