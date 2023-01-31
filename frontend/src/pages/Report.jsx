import React, { useState } from "react";
import styles from "./styles/Report.module.css";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function Report() {
  const [userId, setuserID] = useState('')
  const [comment,setComment] = useState('')
  const report = () => {
    const context = {
      userId: "userId",
      comment: "comment"
    }
    axios
    .post('http://localhost:8080/report/', context)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-black-100" />
        <div className={styles.title}>신고하기</div>
      </div>
      <div className={styles.reportform}>
        <div className={styles.title}>
          뇸뇸이 님을 신고하는 이유를 작성해주세요.
        </div>
        <textarea
          className={styles.contents}
          cols="30"
          rows="10"
          placeholder="신고 하는 이유를 상세히 기재해 주세요."
        ></textarea>
      </div>
      <div className={styles.button} onClick={report}>작성완료</div>
    </div>
  );
}
