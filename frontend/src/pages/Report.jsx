import React, { useState } from "react";
import styles from "./styles/Report.module.css";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function Report() {
  const location = useLocation();
  // 신고 당하는 사람
  const reported = location.state.other;
  // 신고하는 사람
  const reporter = useSelector((state) => {return state.user.userCode;});
  const [content, setContents] = useState("");

  const handleReport = () => {
    axios
      .post(`https://i8c110.p.ssafy.io/api/user/report/${reported.userCode}`, {
        reporter,
        content,
      })
      .then((res) => {console.log(res)})
      .catch((err) => {console.log(err)});
  };

  const handleChange = (e) => {
    setContents(e.target.value);
  };

  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-black-100" />
        <div className={styles.title}>신고하기</div>
      </div>
      <div className={styles.reportform}>
        <div className={styles.title}>
          {reported.kakaoNickname} 님을 신고하는 이유를 작성해주세요.
        </div>
        <textarea
          className={styles.contents}
          cols="30"
          rows="10"
          placeholder="신고 하는 이유를 상세히 기재해 주세요."
          onChange={handleChange}
        ></textarea>
      </div>
      <div className={styles.button} onClick={handleReport}>
        작성완료
      </div>
    </div>
  );
}
