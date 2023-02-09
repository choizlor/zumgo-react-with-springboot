import React from "react";
import styles from "./Reviews.module.css";
import ReviewItem from "./ReviewItem";

export default function Reviews({userInfo}) {
  return (
    <div className={styles.body}>
      <span className={styles.title}>{userInfo.kakaoNickname}님께 달린 리뷰</span>
      <div className={styles.reviewcontainer}>
        <ReviewItem />
        <ReviewItem />
      </div>
    </div>
  );
}
