import React, { useState } from "react";
import styles from "./styles/Report.module.css";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Report() {

  const param = useParams();
  console.log(param);
  const reported = param.userId;
  // 리포터는 store
  const [reporter, setreporter] = useState("");
  const [content, setContents] = useState("");

  const report = () => {
    axios
      .post(`https://i8c110.p.ssafy.io:8080/api/user/report/${reported}`, {
        reporter : 2,
        content:"신고해븐다,,,",
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {});
  };

  const handleChange = (e) => {
    setContents(e.target.value)

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
          onChange={handleChange}
        ></textarea>
      </div>
      <div className={styles.button} onClick={report}>
        작성완료
      </div>
    </div>
  );
}