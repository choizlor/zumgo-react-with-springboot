import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import ReviewItem from "./ReviewItem";
import axios from "axios";

export default function Reviews({ userId, userNickname }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get(`https://i8c110.p.ssafy.io/api/v1/review/seller/${userId}`)
      .then((res) => {
        console.log(res.data, '🎨');
        console.log(res.data.MyReview, '👓');
        setReviews(res.data.MyReview);
        console.log(reviews, '뤼발')
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.body}>
      <span className={styles.title}>{userNickname}님께 달린 리뷰</span>
      { reviews.length() === 0 ? (
        <div>작성된 댓글이 없어요 ㅠ</div>
      ) : (
        <div className={styles.reviewcontainer}>
          {reviews?.map((review) => {
            <ReviewItem key={review.reviewId} review={review} />;
          })}
        </div>
      )}
    </div>
  );
}
