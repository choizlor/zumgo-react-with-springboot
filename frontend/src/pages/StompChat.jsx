import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import SockJs from "sockjs-client";

export default function StompChat() {
  // const client = useRef({});
  const { channelId } = useParams(); // 채널을 구분하는 식별자

  const [chatList, setChatList] = useState([]); // 채팅 기록
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  const token = window.localStorage.getItem('token')

  const client = new StompJs.Client({
      brokerURL: "ws://localhost:8080/stomp/chat",
      connectHeaders: {
        token: window.localStorage.getItem("token"),
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000, // 자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  
  // 연결
  client.onConnect = function (frame) {
    // 연결 되었을 때 실행할 함수
    console.log('연결됐어 즐겨 유나')
    subscribe();
  };
  
  // 에러 처리 함수
  client.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details:  "+ frame.body);
  };
  
  client.activate();
  // client.activate();
  // // 연결
  // const connect = () => {
  //   client.current = new StompJs.Client({
  //     // STOMP 클라이언트 생성
  //     brokerURL: "ws://localhost:8080/stomp/chat",
  //     onConnect: () => {
  //       subscribe(); // 연결 성공하면 구독하기
  //     },
  //     connectHeaders: {
  //       token: window.localStorage.getItem("token"),
  //     },
  //   });

  //   client.current.activate(); // 클라이언트 활성화
  // };

  // // 연결 끊기
  // const disconnect = () => {
  //   client.current.deactivate();
  // };

  const subscribe = () => {
    client.subscribe(`/sub`, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((chats) => [
        ...chats,
        json_body, // 기존의 chatlist에 받아온 데이터 추가해주기
      ]);
    });
  };

  const sendMsg = (chat) => {
    if (!client.current.connected) return; // 비연결 => 메시지 보내지 않음

    client.publish({
      destination: "/pub",
      body: JSON.stringify({
        // applyId: channelId,
        chat,
      }),
    });
    setChat("");
  };

  const handleInputChange = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = (event, chat) => {
    event.preventDefault();

    sendMsg(chat);
  };

  // useEffect(() => {
  //   // 최초 렌더링 시 , 웹소켓에 연결
  //   connect();

  //   return () => disconnect();
  // }, []);

  return (
    <div>
      <div>{chatList}</div>
      <form onSubmit={(event) => handleSubmit(event, chat)}>
        <input type="text" onChange={handleInputChange} value={chat} />
        <input type="submit" value={"전송"} />
      </form>
    </div>
  );
}
