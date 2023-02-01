import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";

export default function StompChat() {
  const client = useRef({});
  const { channelId } = useParams(); // 채널을 구분하는 식별자

  const [chatList, setChatList] = useState([]); // 채팅 기록
  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  // 연결
  const connect = () => {
    client.current = new StompJs.Client({
      // STOMP 클라이언트 생성
      brokerURL: "ws://localhost:8080/stomp/chat",
      onConnect: () => {
        subscribe(); // 연결 성공하면 구독하기
      },
      connectHeaders: {
        token: window.localStorage.getItem("token"),
      },
    });

    client.current.activate(); // 클라이언트 활성화
  };

  // 연결 끊기
  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub`, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((chats) => [
        ...chats,
        json_body, // 기존의 chatlist에 받아온 데이터 추가해주기
      ]);
    });
  };

  const sendMsg = (chat) => {
    if (!client.current.connected) return; // 비연결 => 메시지 보내지 않음

    client.current.publish({
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

  useEffect(() => {
    // 최초 렌더링 시 , 웹소켓에 연결
    connect();

    return () => disconnect();
  }, []);

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
