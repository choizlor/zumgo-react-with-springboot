import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import ReviewItem from "./ReviewItem";
import axios from 'axios';

export default function Reviews({ userId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios.get(`https://i8c110.p.ssafy.io/api/v1/review/seller/${userId}`)
    .then((res)=>{
      setReviews(res.data.myReview)
    })
    .catch((err) => {console.log(err)})
  })
  return (
    <div className={styles.body}>
      <span className={styles.title}>{userInfo.kakaoNickname}님께 달린 리뷰</span>
      <div className={styles.reviewcontainer}>
        {
          reviews?.map((review) => {
            <ReviewItem key={review.reviewId} review={review}/>
          })
        }
      </div>
    </div>
  );
}
