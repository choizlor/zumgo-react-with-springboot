import React, { useState, useEffect } from "react";
import styles from "./styles/ChatRoom.module.css";
import { useSelector } from "react-redux";
import testImg from "../assets/images/testImg.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router";

import * as StompJs from "@stomp/stompjs";

// heroicons
import { ChevronLeftIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function ChatRoom() {
  // 현재 로그인된 사용자
  const user = useSelector((state) => {
    return state.user;
  });

  let navigate = useNavigate();
  const location = useLocation();
  const sellerId = location.state?.sellerId;
  const buyerId = location.state?.buyerId;
  const sellerNickname = location.state?.sellerNickname;
  const buyerNickname = location.state?.buyerNickname;
  const sellerImg = location.state?.sellerImg;
  const buyerImg = location.state?.buyerImg;

  const otherImg = sellerId === user.userCode ? buyerImg : sellerImg;
  const otherId = sellerId === user.userCode ? buyerId : sellerId;
  const otherNickname =
    sellerId === user.userCode ? buyerNickname : sellerNickname;

  const param = useParams(); // 채널을 구분하는 식별자c
  const chatroomId = param.chatroomId;

  let [client, changeClient] = useState(null);
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState([]); // 채팅 기록
  const history = location.state?.chats;

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const preMsgBox = history?.map((item, idx) => {
    const date = new Date(item.chat_date);
    var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)

    if (item.chatterId !== user.userCode) {
      return (
        <div key={idx} className={styles.otherchat}>
          <div className={styles.otherimg}>
            <img src={otherImg} alt="" />
          </div>
          <div className={styles.othermsg}>
            <span>{item.chat_content}</span>
          </div>
          <span className={styles.otherdate}>
            {hour}:{minute}
          </span>
        </div>
      );
    } else {
      return (
        <div key={idx} className={styles.mychat}>
          <div className={styles.mymsg}>
            <span>{item.chat_content}</span>
          </div>
          <span className={styles.otherdate}>
            {hour}:{minute}
          </span>
        </div>
      );
    }
  });

  const msgBox = chatList?.map((item, idx) => {
    const date = new Date();
    var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)

    if (item.sender !== user.userCode) {
      return (
        <div key={idx} className={styles.otherchat}>
          <div className={styles.otherimg}>
            <img src={otherImg} alt="" />
          </div>
          <div className={styles.othermsg}>
            <span>{item.data}</span>
          </div>
          <span className={styles.otherdate}>{hour}:{minute}</span>
        </div>
      );
    } else {
      return (
        <div key={idx} className={styles.mychat}>
          <div className={styles.mymsg}>
            <span>{item.data}</span>
          </div>
          <span className={styles.mydate}>{hour}:{minute}</span>
        </div>
      );
    }
  });

  // websocket
  // websocket
  // websocket
  // websocket
  // websocket
  // websocket
  // websocket

  const connect = () => {
    // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        brokerURL: "wss://i8c110.p.ssafy.io/chat",
        connectHeaders: {
          login: "",
          passcode: "password",
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 구독
      clientdata.onConnect = function () {
        clientdata.subscribe("/sub/channels/" + chatroomId, callback);
      };

      clientdata.activate(); // 클라이언트 활성화
      changeClient(clientdata); // 클라이언트 갱신
    } catch (err) {
      console.log(err);
    }
  };

  const disConnect = () => {
    // 연결 끊기
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  // 콜백함수 => ChatList 저장하기
  const callback = function (message) {
    if (message.body) {
      let msg = JSON.parse(message.body);
      console.log(msg, "🎁");
      setChatList((chats) => [...chats, msg]);
    }
  };

  // 메시지 보내기
  const sendChat = () => {
    if (chat === "") {
      return;
    }


    client.publish({
      destination: "/pub/chat/" + chatroomId,
      body: JSON.stringify({
        type: "",
        sender: user.userCode,
        channelId: chatroomId,
        data: chat,
      }),
      headers: { priority: 9 },
    });

    setChat("");
  };

  // 채팅방 삭제하기
  const exitChatRoom = () => {
    alert("대화정보가 함께 삭제됩니다!.");
    axios
      .delete(`https://i8c110.p.ssafy.io/api/v1/socket/exit?id=${chatroomId}`, )
      .then((res) => {
        disConnect();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // 최초 렌더링 시 , 웹소켓에 연결
    connect();

    return () => disConnect();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {/* 상단 네비게이션 */}
        <div className={styles.topbar}>
          <ChevronLeftIcon
            onClick={() => {
              disConnect();
              navigate("/chatlist");
            }}
          />
          <span>{otherNickname}</span>
          <div className={styles.delete} onClick={exitChatRoom}>
            나가기
          </div>
        </div>

        {/* 채팅 리스트 */}
        <div className={styles.chatbox}>
          {preMsgBox}
          {msgBox}
        </div>

        {/* 하단 입력폼 */}
        <form className={styles.sendzone} onSubmit={handleSubmit}>
          <MegaphoneIcon onClick={() => navigate(`/report/${otherId}`)} />
          <div className={styles.inputbar}>
            <div>
              <input
                type="text"
                id="msg"
                value={chat}
                placeholder="메시지 보내기"
                className={styles.input}
                onChange={onChangeChat}
              />
            </div>
            <ArrowUpCircleIcon
              value="전송"
              className={styles.sendbtn}
              onClick={sendChat}
            />
          </div>
        </form>
      </div>
    </>
  );
}
