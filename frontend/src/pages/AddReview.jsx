import React, { useState } from "react";
import styles from "./styles/AddReview.module.css";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function AddReview() {
  const [seller,setseller] = useState("");
  const [buyer,serbuyer] = useState("");
  const [review, setreview] = useState("");


  const handleChange = (e) => {
    setreview(e.target.value)
  }

  const param = useParams();


  const productId = param.productId;


  const addReview = () => {
    axios
    .post(`https://i8c110.p.ssafy.io:8080/review/${productId}`,{
      seller:2,
      buyer:1,
      review,
    })
    .then((res) => {
      console.log(res)
      setreview('')
    })
    .catch((err) => {console.log(err)});
  };

  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-black-100" />
        <div className={styles.title}>리뷰 작성</div>
      </div>
      <div className={styles.reviewform}>
        <div className={styles.trade}>{} 님과의 거래 어떠셨나요?</div>
        <textarea
          className={styles.comments}
          cols="30"
          rows="10"
          placeholder="거래 후기를 최소 20자 이상 남겨주시면 다음 거래에 도움이 됩니다."
          value={review}
            onChange={handleChange}
        ></textarea>
      </div>
      <div className={styles.submit}  onClick={addReview}>작성완료</div>
    </div>
  );
}
