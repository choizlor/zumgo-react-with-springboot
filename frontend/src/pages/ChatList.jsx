import React from "react";
import styles from "./styles/ChatList.module.css";
import Bottomnav from "../components/Nav/BottomNav.jsx";
import kim from "../assets/images/kim.png";
import testImg from "../assets/images/testImg.jpg";
import { useState } from "react";

export default function ChatList() {
  const [chats, setChats] = useState([
    {
      roomId: 1,
      otherImg: kim,
      otherName: "냠냠이",
      lastMsg: "거래하고 싶어용!",
      lastTime: "오후 8:45",
      notyet: 3,
    },
    {
        roomId: 1,
        otherImg: kim,
        otherName: "냠냠이",
        lastMsg: "거래하고 싶어용!",
        lastTime: "오후 8:45",
        notyet: 3,
      },
      {
        roomId: 1,
        otherImg: kim,
        otherName: "냠냠이",
        lastMsg: "거래하고 싶어용!",
        lastTime: "오후 8:45",
        notyet: 3,
      },
  ]);

  return (
    <div>
      <div className={styles.title}>채팅</div>
      <div className={styles.chatlistbox}>
        {/* 채팅 - map으로 돌려야함,,,나중에 */}
        {chats.map((chat, idx) => (
          <div key={idx} className={styles.chat}>
            <div className={styles.leftbox}>
              <div className={styles.otherimg}>
                <img src={chat.otherImg} alt="" />
              </div>
              <div className={styles.chatinfo}>
                <div className={styles.chatinfotop}>
                  <div className={styles.othername}>{chat.otherName}</div>
                  <div className={styles.time}>{chat.time}</div>
                </div>
                <div className={styles.chatinfobottom}>
                  <span className={styles.lastmsg}>{chat.lastMsg}</span>
                  <span className={styles.notyet}>{chat.notyet}</span>
                </div>
              </div>
            </div>
            <div className={styles.productimg}>
              <img src={testImg} alt="" />
            </div>
          </div>
        ))}
      </div>
      <Bottomnav />
    </div>
  );
}
