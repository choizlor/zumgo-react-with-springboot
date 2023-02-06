import React from "react";
import styles from "./DetailModal.module.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DetailModal({setModalOpen}) {
  const navigate = useNavigate();
  const userId = useSelector((state) => { return state.user.userCode})
  const isReview = true;

  const closeModal = () => {
    setModalOpen(false)
  }

  // 리뷰 메시지 보내기 
  const sendReviewMsg = () => {
    // 판매자 정보, 구매자 정보 보내주기
    axios.post('http://i8c110.p.ssafy.io:8080/socket/room', {
      buyerCode: 1,
      sellerCode: userId, 
    }).then((res) => { navigate(`/chatroom/${res.data}`, {state : isReview })})
  }
  
  return (
    <div className={styles.body}>
      <XMarkIcon onClick={closeModal}/>
      <span className={styles.title}>누구와 거래하셨나요?</span>
      <div className={styles.scrollbox}>
        <div className={styles.userbox} onClick={sendReviewMsg}>
          <img
            src="https://sitem.ssgcdn.com/18/83/93/item/2097000938318_i1_1200.jpg"
            className={styles.userimg}
          />
          <span className={styles.username}>딸기우유 서녕</span>
        </div>
      </div>
    </div>
  );
}
