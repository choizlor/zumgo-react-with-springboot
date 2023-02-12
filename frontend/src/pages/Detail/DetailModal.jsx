import React, { useState, useEffect } from "react";
import styles from "./DetailModal.module.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DetailModal({ setModalOpen }) {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const userId = useSelector((state) => {  // 현재 로그인된 사용자 === 판매자
    return state.user.userCode;
  });

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
        console.log(res.data)
        closeModal(false);
        navigate(`/chatroom/${res.data.chatRoomId}`, {state : {
          chats: res.data.chatList,
          seller : res.data.seller,
          buyer : res.data.buyer,
          type: "review",
          title: "",
        }});
      });
  };

  useEffect(() => {
    axios // 채팅목록 불러오기
      .get(`https://i8c110.p.ssafy.io/api/v1/socket/${userId}/all`)
      .then((res) => {
        setChats(res.data);
        console.log(res.data, "detail 모달 채팅 리스트 🎄");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.icon}>
        <XMarkIcon className={styles.xicon} onClick={closeModal} />
      </div>
      <span className={styles.title}>누구와 거래하셨나요?</span>
      <div className={styles.scrollbox}>
        {chats?.map((chat) => (
          <div key={chat.roomId} className={styles.userbox}>
            <img
              src={
                userId === chat.buyer.userCode
                  ? chat.seller.kakaoProfileImg
                  : chat.buyer.kakaoProfileImg
              }
              className={styles.userimg}
            />
            <span
              className={styles.username}
              onClick={() => {sendReviewMsg(
                userId === chat.buyer.userCode
                  ? chat.seller.userCode
                  : chat.buyer.userCode
              )}}
            >
              {userId === chat.buyer.userCode
                ? chat.seller.kakaoNickname
                : chat.buyer.kakaoNickname}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
