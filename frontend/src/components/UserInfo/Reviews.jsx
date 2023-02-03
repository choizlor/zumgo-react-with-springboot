import React from "react";
import styles from "./Reviews.module.css";
import ReviewItem from "./ReviewItem";

export default function Reviews() {
  return (
    <div className={styles.body}>
      <span className={styles.title}>냠냠이님께 달린 리뷰</span>
      <div className={styles.reviewcontainer}>
        <ReviewItem />
        <ReviewItem />
      </div>
    </div>
  );
}
