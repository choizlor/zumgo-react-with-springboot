import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewItem from "./ReviewItem";

export default function Reviews({ userInfo }) {
  const [reviews, setReviews] = useState([]);

  const params= useParams()
  const userId = params.userId;

  useEffect(() => {
    console.log("렌더링", "");
    axios
      .get(`https://i8c110.p.ssafy.io/api/v1/review/seller/${userId}`)
      .then((res) => {
        setReviews(res.data.MyReview);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.body}>
      <span className={styles.title}>
        {userInfo?.kakaoNickname}님께 달린 리뷰
      </span>

      <div className={styles.reviewcontainer}>
        {reviews?.map((review) => {
          if (review.review === '') { return }
          return <ReviewItem key={review?.reviewId} review={review} />;
        })}
      </div>
    </div>
  );
}
