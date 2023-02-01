import React from "react";
import { useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import { useEffect } from "react";

export default function StompChat() {
  const client = useRef({});

  // 연결
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: () => {
        // 연결 성공하면 구독하기
        subscribe();
      },
    });
    // 클라이언트 활성화
    client.current.activate();
  };
  // 
  const disconnect = () => {
    client.current.deactivate();
  }

  // 최초 렌더링 시 , 웹소켓에 연결
  useEffect(() => {
    connect();

    return () => disconnect();
  }, [])

  return <div></div>;
}

