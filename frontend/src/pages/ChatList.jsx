import React, { useEffect, useState } from "react";
import styles from "./styles/ChatList.module.css";
import Bottomnav from "../components/Nav/BottomNav.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";

export default function ChatList() {
  const location = useLocation();
  const curLocation = location.pathname
  const navigate = useNavigate();

  const userId = useSelector((state) => {
    return state.user.userCode;
  });

  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios
      .get(`https://i8c110.p.ssafy.io/api/v1/socket/${userId}/all`)
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 일반채팅하기
  const getChatHistory = (sellerId, buyerId) => {
    // 판매자 정보, 구매자 정보 보내주기
    axios
      .post("https://i8c110.p.ssafy.io/api/v1/socket/room", {
        buyerCode: buyerId,
        sellerCode: sellerId,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/chatroom/${res.data.chatRoomId}`, { state : {
          chats : res.data.chatList,
          sellerId,
          buyerId,
        }});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className={styles.title}>채팅</div>
      <div className={styles.chatlistbox}>
        {chats?.map((chat, idx) => {
          return (
            <div
              key={idx}
              className={styles.chat}
              onClick={() => {
                getChatHistory(chat.seller.userCode, chat.buyer.userCode);
              }}
            >
              <div className={styles.leftbox}>
                <div className={styles.otherimg}>
                  <img
                    src={
                      chat.seller.userCode === userId
                        ? chat.buyer.kakaoProfileImg
                        : chat.seller.kakaoProfileImg
                    }
                    alt=""
                  />
                </div>
                <div className={styles.chatinfo}>
                  <div className={styles.chatinfotop}>
                    <div className={styles.othername}>
                      {chat.seller.userCode === userId
                        ? chat.buyer.kakaoNickname
                        : chat.seller.kakaoNickname}
                    </div>
                    <div className={styles.time}>{chat.time}</div>
                  </div>
                  <div className={styles.chatinfobottom}>
                    <span className={styles.lastmsg}>
                      {chat.lastChat["chat_content"]}
                    </span>
                    <span className={styles.notyet}>{chat.notyet}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Bottomnav curLocation={curLocation}/>
    </div>
  );
}
