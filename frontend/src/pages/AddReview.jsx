import React from "react";
import styles from "./styles/AddReview.module.css";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
export default function AddReview() {
  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-black-100" />
        <div className={styles.title}>리뷰 작성</div>
      </div>
      <div className={styles.reviewform}>
        <div className={styles.trade}>뇸뇸이 님과의 거래 어떠셨나요?</div>
        <textarea
          className={styles.comments}
          cols="30"
          rows="10"
          placeholder="거래 후기를 최소 20자 이상 남겨주시면 다음 거래에 도움이 됩니다."
          onChange={setChange}
          
          //   onChange={handleChange}
        ></textarea>
      </div>
      <div className={styles.submit}>작성완료</div>
    </div>
  );
}
