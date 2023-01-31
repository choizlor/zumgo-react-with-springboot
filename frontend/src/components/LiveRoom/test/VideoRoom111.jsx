import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component, useCallback } from "react";
import UserVideoComponent from "../UserVideoComponent";

const OPENVIDU_SERVER_URL = "http://localhost:5000/";

const VideoRoom = () => {
    const [mySessionId, setMySessionId] = useState('SessionA');
    const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
    const [session, setSession] = useState(undefined);
    const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
    const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
    const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
    
    let OV = undefined;

    // 토큰 받아오기
    // const getToken = useCallback(() => {
    //     return createSession(mySessionId).then((sessionId) => createToken(sessionId));
    // }, [mySessionId])
}