import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component, useCallback } from "react";
import UserVideoComponent from "../UserVideoComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./VideoRoomTest.module.css";

import basicImg from "../../../assets/images/kim.png";

const OPENVIDU_SERVER_URL = "https://i8c110.p.ssafy.io:3306";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const VideoRoomTest = () => {
  const navigate = useNavigate(); // 네비게이터(방 나갈 때 사용)
  const dispatch = useDispatch();
  const location = useLocation();
  const roomId = location.state !== null ? location.state.id : null;
  const roomTitle = location.state !== null ? location.state.title : null;
  const isHost = false; // useSelector?

  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
  const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수

  const [profileImg, setProFileImg] = useState(basicImg); // 프로필 이미지
  const [hostName, setHostName] = useState(undefined); // host 이름

  let OV = undefined;

  // 토큰 받아오기
  const getToken = useCallback(() => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }, [mySessionId]);

  // 세션 생성
  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("CREATE SESSION", res);
          resolve(res.data.id);
        })
        .catch((err) => {
          console.log;
        });
    });
  };

  // 토큰 생성
  const createToken = (sessionId) => {
    let myRole = isHost ? "PUBLISHER" : "SUBSCRIBER";
    return new Promise((resolve, reject) => {
      const data = { role: myRole };
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  // 세션 아이디 설정
  useEffect(() => {
    setMySessionId(`Session${roomId}`);
  }, []);

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

    // 유효한 토큰으로 세션에 접속하기
    getToken().then((token) => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          let devices = await OV.getDevices();
          let videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          // Get your own camera stream ---(퍼블리셔)
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "360x740", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          });

          mySession.publish(publisher); // 자신의 화면을 송출
          setPublisher(publisher); // 퍼블리셔(스트림 객체)를 담음
          setMainStreamManager(publisher); // 퍼블리셔(스트림 객체)를 담음
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // 방 삭제 요청 api
  const deleteRoomRequest = async () => {
    if (isHost) {
      // dispatch(changeStatus(false));
      // setIsHost(false) // isHost를 false로 설정함
      const reqeustResponse = await deleteRoom(roomId);
      if (reqeustResponse) {
        console.log("Room Deleted Successfully!");
      } else {
        console.log("Room Deleted Failed!");
      }
    }
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

  // user정보 가져오기
  // axios 요청? redux?
  const getUserInfo = async () => {
    const user = state.userinfo;
    const ownerPicturePath = user.picture;
    const ownerName = user.name;
    setProFileImg(ownerPicturePath);
    setHostName(ownerName);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 로딩 페이지를 통한 방 입장
  const enterAuctionRoom = () => {
    joinSession();
  };

  return (
    <div className={styles.container}>
      {session === undefined && roomId !== null && (
        <Loading enterAuctionRoom={enterAuctionRoom}></Loading> // Loading 페이지 만들어야 함.
      )}
      {session === undefined ? (
        <div className={styles.container}>
          {mainStreamManager !== undefined ? (
            <div className={styles.mainvideo}>
              {isHost && <UserVideoComponent streamManager={publisher} />}
              {!isHost && <UserVideoComponent streamManager={subscribers} />}
            </div>
          ) : null}
          <div className={styles.sessionheader}>
            <div className={styles.profile}>
              <img src={profileImg} alt="/" />
            </div>
            <div className={styles.hostname}>{hostName}</div>
          </div>
          <div className={styles.totaluser}>{totalUsers}</div>
          <div className={styles.livebtn}>LIVE</div>
          <button
            className={styles.leavebtn}
            leaveSession={leaveSession}
          ></button>
        </div>
      ) : null}
    </div>
  );
};

export default VideoRoomTest;
