import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component, useCallback, useEffect, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import ChattingForm from "./ChattingForm";
import ChattingList from "./ChattingList";
import Timer from "../Auction/Timer";
import { EyeIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./VideoRoom.module.css";

import userImg from "../../assets/images/kim.png";
import Price from "../Auction/Price";
import SellerLoading from "../Live/SellerLoading";
import BuyerLoading from "../Live/BuyerLoading";

const OPENVIDU_SERVER_URL = "https://i8c110.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "isf6";

const VideoRoom = () => {
  const navigate = useNavigate(); // 네비게이터(방 나갈 때 사용)
  const roomId = useParams().productId;
  const [product, setProduct] = useState({});
  const user = useSelector((state) => {
    return state.user;
  });
  const isHost = Number(product.userCode) === user.userCode ? true : false;
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    setMyUserName(user.kakaoNickname);

    (async () => {
      try {
        await axios
          .get(
            `https://i8c110.p.ssafy.io/api/v1/product/${roomId}?userCode=${user.userCode}`
          )
          .then((res) => {
            setProduct(res.data);
            setBidPrice(res.data.price);
            const id = res.data.userCode;

            axios
              .get(`https://i8c110.p.ssafy.io/api/user/${id}`)
              .then((res) => {
                setHostName(res.data.user.kakaoNickname);
              });
          });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
  const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
  const [messageList, setMessageList] = useState([]); // 메세지 정보를 담을 배열
  const [seconds, setSeconds] = useState(0); //타이머 시작 시간
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수
  const [chatDisplay, setChatDisplay] = useState(true); // 채팅창 보이기(초깃값: true)
  const [profileImg, setProFileImg] = useState(userImg); // 프로필 이미지
  const [hostName, setHostName] = useState(undefined); // host 이름
  // const [timerOpen, setTimerOpen] = useState(false);
  const [bidders, setBidders] = useState(0);
  const [priceOpen, setPriceOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  const [bidCount, setBidCount] = useState(0);
  const [bestBidder, setBestBidder] = useState("");
  const [celebrity, setCelebrity] = useState(false);
  const [noncelebrity, setNonCelebrity] = useState(false);

  console.log(isHost, "😎");

  let OV = undefined;

  // 토큰 받아오기
  const getToken = () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  };

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
        .catch((res) => {
          var error = Object.assign({}, res);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
          }
        });
    });
  };

  // 토큰 생성
  const createToken = (sessionId) => {
    let myRole = isHost ? "PUBLISHER" : "SUBSCRIBER";
    console.log(myRole, "🙄내역할");
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
    OV.enableProdMode();

    let mySession = OV.initSession();
    setSession(mySession);

    mySession.on("streamCreated", (event) => {
      // 스트림이 생길 때마다
      const subscriber = mySession.subscribe(event.stream, "subscriber");
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

    mySession.on("signal:chat", (event) => {
      // 채팅 신호 수신
      setMessageList((prevMessageList) => {
        return [...prevMessageList, event.data];
      });
    });

    mySession.on("signal:timer", (event) => {
      // "timer"라는 시그널 받아서 시간 초기 세팅
      setSeconds(event.data); // 시간 세팅
    });

    mySession.on("signal:count", (event) => {
      const tmp = event.data.split(" : ");
      setBidders(Number(tmp[0]));
      setBestBidder(tmp[1])
    });

    mySession.on("signal:bid", (event) => {
      const tmp = event.data.split(" : ");
      setBidPrice(tmp[0]);
      setBestBidder(tmp[1]);
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
          // 전면 카메라(웹 내부에서 실험해볼 때)
          // .then(async () => {
          //   OV.getUserMedia({
          //     audioSource: false,
          //     videoSource: undefined,
          //     resolution: "1280x720",
          //     frameRate: 30,
          //     video: { facingMode: { exact: "environment" } },
          //   }).then((mediaStream) => {
          //     var videoTrack = mediaStream.getVideoTracks()[0];

          //     var publisher = OV.initPublisher(undefined, {
          //       audioSource: undefined,
          //       videoSource: videoTrack,
          //       publishAudio: true,
          //       publishVideo: true,
          //       insertMode: "APPEND",
          //       mirror: true,
          //     });
          //     mySession.publish(publisher); // 자신의 화면을 송출
          //     setPublisher(publisher); // 퍼블리셔(스트림 객체)를 담음
          //     setMainStreamManager(publisher); // 퍼블리셔(스트림 객체)를 담음
          //   });
          // Get your own camera stream ---(퍼블리셔)
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices.slice(-1)[0].deviceId, // 후면 카메라(갤럭시만,,)
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "1280x720", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
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
  const deleteRoomRequest = () => {
    if (isHost) {
      // 내가 host이면,
      axios
        .delete(`https://i8c110.p.ssafy.io/api/v1/live/${roomId}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 메세지 보내기(Sender of the message (after 'session.connect'))
  const sendMsg = (msg, currentSession) => {
    currentSession
      .signal({
        data: msg, // .signal의 data는 문자열만 넘겨야한다
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "chat", // The type of message (optional)
      })
      .then(() => {
        console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // go! 버튼 눌렀을 때 count
  const countBidder = () => {
    // setBidders((bidders) => bidders + 1)
    session
      .signal({
        data: `${Number(bidders) + 1} : ${myUserName}`,
        type: "count",
      })
      .then(() => {
        console.log("Success count");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // bidPrice가 갱신될 때마다 signal 보내서 동기화
  const bidding = (price, bidder) => {
    session
      .signal({
        data: `${Number(bidPrice) + price} : ${bidder}`,
        type: "bid",
      })
      .then(() => {
        console.log("Success count");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // price가 변경될 때마다 bidding 실행
  const handleBidPrice = (price, bidder) => {
    bidding(price, bidder);
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
    setMessageList([]);
    setChatDisplay(true);
    setTotalUsers((prevTotalUsers) => {
      return 0;
    });
    setSeconds(0);
    deleteRoomRequest(); // 방 삭제 요청
  };

  const startAuction = () => {
    // setTimerOpen(true);
    setSeconds(2);
  };

  const startBidding = () => {
    // setTimerOpen(true);
    setSeconds(3);
  };

  useEffect(() => {
    if (bidPrice > product.price) {
      // product 가격으로 바꿔야 함
      startBidding();
    }
  }, [bidPrice]);

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

  useEffect(() => {
    const onbeforeunload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", onbeforeunload); // componentDidMount
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, [leaveSession]);

  // 로딩 페이지를 통한 방 입장
  // const enterAuctionRoom = () => {
  //   joinSession();
  // };

  return (
    <div className={styles.container}>
      {/* 입장 전 보이는 화면 */}
      {session === undefined ? (
        <div>
          {isHost ? (
            <SellerLoading
              joinSession={joinSession}
              roomId={roomId}
              title={product.title}
            />
          ) : (
            <BuyerLoading joinSession={joinSession} title={product.title} />
          )}
        </div>
      ) : null}

      {/* 비디오 화면 뜨는 곳 */}
      {session !== undefined ? (
        <div className={styles.container}>
          {mainStreamManager !== undefined ? (
            <div className={styles.mainvideo}>
              {/* <UserVideoComponent streamManager={mainStreamManager} /> */}
              {isHost && <UserVideoComponent streamManager={publisher} />}
              {!isHost && <UserVideoComponent streamManager={subscribers} />}
            </div>
          ) : null}

          {/* 배경 그라데이션 */}
          <div className={styles.background}>
            <div className={styles.bgtop}></div>
            <div className={styles.bgbottom}></div>
          </div>

          {/* 라이브 화면 */}
          <div className={styles.top}>
            <div className={styles.toptop}>
              <div className={styles.topleft}>
                <div className={styles.host}>
                  <div className={styles.sellerimg}>
                    <img src={userImg} alt="" />
                  </div>
                  <div className={styles.sellername}>{hostName} 님</div>
                </div>
                <div className={styles.subtotal}>
                  <EyeIcon className={styles.eyeicon} />
                  {totalUsers}
                </div>
              </div>
              <div className={styles.topright}>
                <div className={styles.live}>LIVE</div>
                <XMarkIcon
                  className={styles.xicon}
                  onClick={() => {
                    leaveSession();
                  }}
                />
              </div>
            </div>
            {/* <div className={styles.topbottom}>음성변조 아이콘</div> */}
            <div className={styles.bottom}>
              <div className={styles.bottomtop}>
                <ChattingList messageList={messageList} />
              </div>
              <div className={styles.bottombottom}>
                <ChattingForm
                  myUserName={myUserName}
                  onMessage={sendMsg}
                  currentSession={session}
                />
                {isHost ? (
                  <button onClick={startAuction} className={styles.gobtn}>
                    go?
                  </button>
                ) : (
                  <button onClick={countBidder} className={styles.gobtn}>
                    go!
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={styles.timer}>
            <Timer
              seconds={seconds}
              setSeconds={setSeconds}
              currentSession={session}
              bidders={bidders}
              setPriceOpen={setPriceOpen}
              bidCount={bidCount}
              bidPrice={bidPrice}
              bestBidder={bestBidder}
              setCelebrity={setCelebrity}
              setNonCelebrity={setNonCelebrity}
              // setTimerOpen={setTimerOpen}
            />
          </div>
          {/* <div>
            <ChattingList messageList={messageList} />
            <ChattingForm
              myUserName={myUserName}
              onMessage={sendMsg}
              currentSession={session}
            />
          </div> */}

          <div>구매의사 수: {bidders}</div>
          <div>입찰가: {bidPrice}</div>
          <div>
            {true ? (
              <Price
                handleBidPrice={handleBidPrice}
                setBidCount={setBidCount}
                myUserName={myUserName}
                setBestBidder={setBestBidder}
                className={styles.price}
              />
            ) : null}
          </div>

          <div>
            {celebrity ? (
              <div className={styles.modal}>
                <div className={styles.modaltitle}>축하합니다!</div>
                <div className={styles.modalimg}>
                  <img src={userImg} alt="" />
                </div>
                <div className={styles.modalbiddername}>{bestBidder} 님이,</div>
                <div className={styles.modalbidprice}>{bidPrice}원에 낙찰!</div>
              </div>
            ) : null}
          </div>

          {/* bidder가 0명일 때 */}
          <div>
            {noncelebrity ? (
              <div className={styles.modal}>
                <div className={styles.modaltext}>입찰자가 없어서</div>
                <div className={styles.modaltext}>
                  경매가 진행되지 않습니다.
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default VideoRoom;
