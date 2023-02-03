import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import { useSelector } from "react-redux";

export default function StompChat() {
  const param = useParams(); // 채널을 구분하는 식별자c
  const chatroomId = param.chatroomId;
  const token = JSON.stringify(window.localStorage.getItem("token")); // 현재 로그인 된 사용자의 토큰

  let [client, changeClient] = useState(null);
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState([]); // 채팅 기록

  const userId = useSelector((state) => { return state.user.userCode})

  const connect = () => {   // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        brokerURL: "ws://localhost:8080/chat",
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
        clientdata.subscribe("/sub/channels/1", callback);
      };

      clientdata.activate(); // 클라이언트 활성화
      changeClient(clientdata); // 클라이언트 갱신
    } catch (err) {
      console.log(err);
    }
  };

  const disConnect = () => {  // 연결 끊기
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

    client.publish({
      destination: "/pub/chat/1",
      body: JSON.stringify({
        type: "",
        sender: userId,
        channelId: "1",
        data: chat,
      }),
      headers: { priority: 9 },
    });

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

  return (
    <div>
      <div>
        <h1>Chat</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="메시지 보내기"
            value={chat}
            onChange={onChangeChat}
          />
          <button onClick={sendChat}>메시지 전송</button>
        </form>
      </div>

      {JSON.stringify(chatList)}
    </div>
  );
}
