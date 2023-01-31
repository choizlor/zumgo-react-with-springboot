import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component, useCallback } from "react";
import UserVideoComponent from "../UserVideoComponent";
import { useNavigate } from "react-router-dom";

const OPENVIDU_SERVER_URL = "http://localhost:5000/";

const VideoRoomTest = () => {
  const navigate = useNavigate(); // 네비게이터(방 나갈 때 사용)

  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
  const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수

  let OV = undefined;

  // 토큰 받아오기
  // const getToken = useCallback(() => {
  //     return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  // }, [mySessionId])

  // 세션에 참여하기
  const joinSession = () => {
    OV = new OpenVidu();

    let mySession = OV.initSession();

    setSession(mySession);

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, "publisher");
      setSubscribers(subscriber);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    mySession.on("connectionCreated", ({ stream }) => {
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers + 1;
      });
    });

    mySession.on("connectionDestroyed", ({ stream }) => {
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers - 1;
      });
    });
  };

  // 세션 떠나기 --- disconnect함수를 호출하여 세션을 떠남
  const leaveSession = () => {
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
      navigate("/live"); // live 탭으로 이동
    }
    // 속성 초기화
    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("sessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setTotalUsers((prevTotalUsers) => {
      return 0;
    });
    deleteRoomRequest(); // 방 삭제 요청
  };

  // 참가자를 배열에서 제거함
  const deleteSubscriber = useCallback(
    (streamManager) => {
      let tmp_subscribers = subscribers;
      let index = tmp_subscribers.indexOf(streamManager, 0);
      if (index > -1) {
        tmp_subscribers.splice(index, 1);
        setSubscribers(tmp_subscribers);
      }
    },
    [subscribers]
  );

  return (
    <div>
      
    </div>
  )
};

export default VideoRoomTest;
