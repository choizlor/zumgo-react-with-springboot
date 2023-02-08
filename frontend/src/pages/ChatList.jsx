import React, { useEffect, useState } from "react";
import styles from "./styles/ChatList.module.css";
import Bottomnav from "../components/Nav/BottomNav.jsx";
import kim from "../assets/images/kim.png";
import testImg from "../assets/images/testImg.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChatList() {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const userId = 3;

  useEffect(() => {
    axios
      .get(`http://i8c110.p.ssafy.io:8080/socket/${userId}/all`)
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className={styles.title}>채팅</div>
      <div className={styles.chatlistbox}>
        {/* 채팅 - map으로 돌려야함,,,나중에 */}
        {chats?.map((chat, idx) => {
          // const other = { chat.seller.userCode === userId? chat.buyer: chat.seller};
          
          return (
            <div
              key={idx}
              className={styles.chat}
              onClick={() => {
                navigate(`/chatroom/${chat.roomId}`, { state: {} });
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
      <Bottomnav />
    </div>
  );
}
