import React, { useState } from "react";
import styles from "./styles/LiveRoom.module.css";
import { ArrowUpCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import testImg from "../assets/images/kim.png";

export default function LiveRoom() {
  const [inputData, setInputData] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setInputData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("입력한 내용 전송:", inputData);
    setInputData("");
    // 채팅 내용 전송하기
  };
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.toplinear}>
          {/* 상단 컨테이너 */}
          <div className={styles.top}>
            <div className={styles.topbar}>
              {/* 상단 왼쪽 판매자 정보 */}
              <div className={styles.topleft}>
                <div className={styles.sellerimg}>
                  <img src={testImg} alt="" />
                </div>
                <div className={styles.sellername}>냠냠이 님</div>
              </div>
              {/* 상단 오른쪽 */}
              <div className={styles.topright}>
                <div className={styles.live}>LIVE</div>
                <XMarkIcon className={styles.exiticon} />
              </div>
            </div>
          </div>
        </div>
        {/* 하단 컨테이너 */}
        <div className={styles.bottomlinear}>
          <div className={styles.bottom}>
            <div className={styles.chats}>채팅목록</div>
            <div className={styles.bottombar}>
              <form className={styles.chatform} onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    value={inputData}
                    className={styles.input}
                    placeholder="댓글 달기"
                    onChange={handleChange}
                  />
                </div>
                <ArrowUpCircleIcon
                  className={styles.submitbtn}
                  onClick={handleSubmit}
                />
              </form>
              <button className={styles.gobtn}>GO?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
