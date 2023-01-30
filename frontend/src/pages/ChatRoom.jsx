import React, { useCallback, useRef, useState, useEffect } from 'react';
import styles from './styles/ChatRoom.module.css';
import { useSelector } from 'react-redux';
import testImg from '../assets/images/testImg.jpg';

import { CameraIcon, ChevronLeftIcon, MegaphoneIcon } from '@heroicons/react/24/outline'
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';

export default function ChatRoom() {

    const user = useSelector((state) => { return state.user })

    const [msg, setMsg] = useState("");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();

    const ws = useRef(null);    //webSocket을 담는 변수, 
    //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

    const msgBox = chatt.map((item, idx) => {

        if (false) {
            return (
                <div key={idx} className={styles.otherchat}>
                    <div className={styles.otherimg}>
                        <img src={testImg} alt="" />
                    </div>
                    <div className={styles.othermsg}>
                        <span>{item.msg}</span></div>
                    <span className={styles.otherdate}>{item.date}</span>
                </div>
            )
        } else {
            return (
                <div key={idx} className={styles.mychat}>
                    <span className={styles.mydate}>{item.mydate}</span>
                    <div className={styles.mymsg}>
                        <span>{item.msg}</span>
                    </div>
                </div>
            )
        }
    });

    useEffect(() => {
        if (socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            console.log(tempData);
            setChatt(tempData);
        }
    }, [socketData]);


    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    const onText = event => {
        console.log(event.target.value);
        setMsg(event.target.value);
    }


    const webSocketLogin = useCallback(() => {
        // 소켓 생성
        ws.current = new WebSocket("ws://localhost:8080/socket/chatt");

        // 메시지가 입력됐을때
        ws.current.onmessage = (message) => {
            // 전송할 데이터를 parsing
            const dataSet = JSON.parse(message.data);
            // 소켓 데이터를 갱신 - 보내지는 않음
            setSocketData(dataSet);
        }
    });

    // 전송 버튼을 눌렀을 때 실행됨,,, ws.current.send()와 전혀 다른 함수
    const send = useCallback(() => {
        // 로그가 없을 때
        if (!chkLog) {

            // 소켓에 로그인
            webSocketLogin();
            // 로그인 상태 - true로 변경
            setChkLog(true);
        }

        if (msg !== '') {
            const date = new Date()
            const theHours = date.getHours();
            const theMinutes = date.getMinutes().toString().padStart(2, "0");

            const data = {
                name: user.kakaoNickname,
                msg,
                date: theHours >= 12 ? '오후 ' + (theHours - 12) + ":" + theMinutes : '오전 ' + theHours + ":" + theMinutes
            };  //전송 데이터(JSON)

            const temp = JSON.stringify(data);

            if (ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                    console.log(ws.current.readyState, '❤️');
                    // 연결만 되면 websocket.send()로 보내주기만 하면 된다.
                    ws.current.send(temp);
                }
            } else {
                ws.current.send(temp);
            }
        } else {
            alert("메세지를 입력하세요.");
            document.getElementById("msg").focus();
            return;
        }
        setMsg("");
    });
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    return (
        <>
            {/* <GlobalStyle/> */}
            <div className={styles.container}>
                {/* 상단 네비게이션 */}
                <div className={styles.topbar}>
                    <ChevronLeftIcon />
                    <span>상대방 이름</span>
                    <MegaphoneIcon />
                </div>

                {/* 채팅 리스트 */}
                <div className={styles.chatbox}>
                    {msgBox}
                </div>

                {/* 하단 입력폼 */}
                <div className={styles.sendzone}>
                    <CameraIcon />
                    <div className={styles.inputbar}>
                        <div>

                            <input type="text" id='msg' value={msg} placeholder="메시지 보내기" className={styles.input} onChange={onText}
                                onKeyDown={(ev) => { if (ev.keyCode === 13) { send(); } }} />
                        </div>
                        <ArrowUpCircleIcon value='전송' className={styles.sendbtn} onClick={send} />
                    </div>
                </div>
            </div>
        </>
    );
}



