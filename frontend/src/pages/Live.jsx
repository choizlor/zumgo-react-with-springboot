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
  const userId = useSelector((state) => {
    return state.user.userCode;
  });

  useEffect(() => {
    axios
      .get(`http://i8c110.p.ssafy.io/live/main?userCode=2`)
      .then((res) => {
        setSellLiveRequestList(res.data.sellLiveRequestList);
        setMyLiveRequestList(res.data.MyLiveRequestList);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <SellLive sellLiveRequestList={sellLiveRequestList} />
      ) : (
        <BuyLive myLiveRequestList={myLiveRequestList} />
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
