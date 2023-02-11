import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import BottomNavDark from "../components/Nav/BottomNavDark.jsx";
import styles from "./styles/Live.module.css";
import cn from "classnames";
import SellLive from "../components/Live/SellLive";
import BuyLive from "../components/Live/BuyLive.jsx";

export default function Live() {
  const [sellLiveRequestList, setSellLiveRequestList] = useState();
  const [myLiveRequestList, setMyLiveRequestList] = useState();
  const [onairList, setOnairList] = useState();
  const userId = useSelector((state) => {
    return state.user.userCode;
  });

  useEffect(() => {
    axios
      .get(`https://i8c110.p.ssafy.io/api/v1/live/main?userCode=${userId}`)
      .then((res) => {
        setSellLiveRequestList(res.data.sellLiveRequestList);
        setMyLiveRequestList(res.data.MyLiveRequestList);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`https://i8c110.p.ssafy.io/api/v1/live/request/${userId}`)
      .then((res) => {
        setOnairList(res.data.myLiveRoomList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  //toggle 상태 표시
  const [toggle, settoggle] = useState(true);
  // toggle을 클릭하면 toggle 바꿔주기
  const toggleMode = () => {
    settoggle(!toggle);
    console.log(toggle); // toggle 바꿔주는 함수  //toggle에 따라 컴포넌트 변하는 함수
  };

  return (
    <div className={styles.body}>
      <div className={styles.logo}>LIVE</div>
      {toggle ? (
        <SellLive sellLiveRequestList={sellLiveRequestList} userId={userId} />
      ) : (
        <BuyLive onairList={onairList} myLiveRequestList={myLiveRequestList} />
      )}

      <div className={styles.togglebtn}>
        <div className={cn(styles.button, styles.cover, styles.toggle)}>
          <div className={cn(styles.button, styles.cover)}>
            <div className={cn(styles.button, styles.r)}>
              <input
                type="checkbox"
                className={styles.checkbox}
                onClick={toggleMode}
              />
              <div className={styles.knobs}></div>
              <div className={styles.layer}></div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavDark />
    </div>
  );
}
