import React from "react";
import styles from "./DetailModal.module.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DetailModal({ setModalOpen, chats }) {
  const navigate = useNavigate();
  const userId = useSelector((state) => {
    return state.user.userCode;
  });

  const isReview = true;

  const closeModal = () => {
    setModalOpen(false);
  };

  // 리뷰 메시지 보내기
  const sendReviewMsg = (buyerCode) => {
    // 판매자 정보, 구매자 정보 보내주기
    axios
      .post("https://i8c110.p.ssafy.io/api/v1/socket/room", {
        buyerCode: buyerCode,
        sellerCode: userId,
      })
      .then((res) => {
        closeModal(false);
        navigate(`/chatroom/${res.data}`, { state: isReview });
      });
  };

  return (
    <div className={styles.body}>
      <div className={styles.icon}>
        <XMarkIcon className={styles.xicon} onClick={closeModal} />
      </div>
      <span className={styles.title}>누구와 거래하셨나요?</span>
      <div className={styles.scrollbox}>
        {chats?.map((chat) => {
          <div
            key={chat.roomId}
            className={styles.userbox}
            onClick={sendReviewMsg(
              userId === chat.buyer.userCode
                ? chat.seller.userCode
                : chat.buyer.userCode
            )}
          >
            <img
              src="https://sitem.ssgcdn.com/18/83/93/item/2097000938318_i1_1200.jpg"
              className={styles.userimg}
            />
            <span className={styles.username}>{
              userId === chat.buyer.userCode
              ? chat.seller.kakaoNickname
              : chat.buyer.kakaoNickname
            }</span>
          </div>;
        })}
      </div>
    </div>
  );
}
