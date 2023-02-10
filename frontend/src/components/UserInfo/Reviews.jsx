import React from "react";
import styles from "./Reviews.module.css";
import ReviewItem from "./ReviewItem";

export default function Reviews({ userInfo, myReivews }) {
  console.log(myReivews, "🎁🎁🎁");
  return (
    <div className={styles.body}>
      <span className={styles.title}>{userInfo.kakaoNickname}님께 달린 리뷰</span>
      <div className={styles.reviewcontainer}>
        {
          myReivews?.map((review) => {

            <ReviewItem key={review.reviewId} review={review}/>
          })
        }
      </div>
    </div>
  );
}
