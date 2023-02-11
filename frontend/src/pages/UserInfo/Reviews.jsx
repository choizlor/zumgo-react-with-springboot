import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import axios from "axios";

export default function Reviews({ userInfo }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://i8c110.p.ssafy.io/api/v1/review/seller/${userInfo.userCode}`)
      .then((res) => {
        console.log(res.data, "🎨");
        console.log(res.data.MyReview, "👓");
        setReviews(res.data.MyReview);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div className={styles.body}>
      <span className={styles.title}>{userInfo.kakaoNickname}님께 달린 리뷰</span>

      <div className={styles.reviewcontainer}>
        {reviews?.map((review, idx) => {
          <div className={styles.review} key={idx}>
            <div className={styles.writer}>{review.buyer.kakaoNickname}</div>
            <div className={styles.comment}>{review.review}</div>
          </div>;
        })}
      </div>
    </div>
  );
}
