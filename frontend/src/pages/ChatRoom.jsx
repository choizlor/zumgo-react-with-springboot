import React, { useCallback, useRef, useState, useEffect } from "react";
import styles from "./styles/ChatRoom.module.css";
import { useSelector } from "react-redux";
import testImg from "../assets/images/testImg.jpg";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import * as StompJs from "@stomp/stompjs";

// heroicons
import {
  CameraIcon,
  ChevronLeftIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function ChatRoom() {
  let navigate = useNavigate();
  let state = useLocation();
  // const requestType = state.state;
  // console.log("requestType:", requestType)

  const param = useParams(); // 채널을 구분하는 식별자c
  const chatroomId = param.chatroomId;
  const token = JSON.stringify(window.localStorage.getItem("token")); // 현재 로그인 된 사용자의 토큰

  let [client, changeClient] = useState(null);
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState([]); // 채팅 기록

  const user = useSelector((state) => {
    return state.user;
  });

  //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

  const msgBox = chatList.map((item, idx) => {
    if (Number(item.sender) !== user.userCode) {
      return (
        <div key={idx} className={styles.otherchat}>
          <div className={styles.otherimg}>
            <img src={testImg} alt="" />
          </div>
          <div className={styles.othermsg}>
            <span>{item.data}</span>
          </div>
          <span className={styles.otherdate}>{item.date}</span>
        </div>
      );
    } else {
      return (
        <div key={idx} className={styles.mychat}>
          <div className={styles.mymsg}>
            <span>{item.data}</span>
          </div>
          <span className={styles.mydate}>{item.date}</span>
        </div>
      );
    }
  });

  const connect = () => {
    // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        brokerURL: "ws://i8c110.p.ssafy.io/chat",
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

        // if (requestType === 'live' || requestType === 'review') {
        //   console.log('라이브 요청 또는 리뷰요청')
        //   sendChat();
        // }
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
      setChatList((chats) => [...chats, msg]);
    }
  };

  const sendChat = () => {
    if (chat === "") {
      return;
    }
    // if (requestType === "live") {
    //   client.publish({
    //     destination: "/pub/chat/" + chatroomId,
    //     body: JSON.stringify({
    //       type: "",
    //       sender: user.userCode,
    //       channelId: chatroomId,
    //       data: user.kakaoNickname + "님 께서 라이브를 요청했어요!",
    //     }),
    //     headers: { priority: 9 },
    //   });
    // } else {
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
    // }

    setChat("");
  };

  useEffect(() => {
    // 최초 렌더링 시 , 웹소켓에 연결
    connect();

    return () => disConnect();
  }, []);

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // 채팅방 삭제하기
  const exitChatRoom = () => {

    alert('대화정보가 함께 삭제됩니다!.')
    axios
      .delete("https://i8c110.p.ssafy.io/api/v1/socket", {
        chatRoomCode: chatroomId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.container}>
        {/* 상단 네비게이션 */}
        <div className={styles.topbar}>
          <ChevronLeftIcon
            onClick={() => {
              navigate(-1);
            }}
          />
          <span>상대방 이름</span>
          <div className={styles.delete} onClick={exitChatRoom}>
            나가기
          </div>
        </div>

        {/* 채팅 리스트 */}
        <div className={styles.chatbox}>{msgBox}</div>

        {/* 하단 입력폼 */}
        <form className={styles.sendzone} onSubmit={handleSubmit}>
          <MegaphoneIcon onClick={() => navigate(`/report/1`)} />
          <div className={styles.inputbar}>
            <div>
              <input
                type="text"
                id="msg"
                value={chat}
                placeholder="메시지 보내기"
                className={styles.input}
                onChange={onChangeChat}
                onKeyDown={(ev) => {
                  if (ev.keyCode === 13) {
                    sendChat();
                  }
                }}
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
