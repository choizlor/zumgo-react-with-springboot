import React from 'react';
import LiveReservation from "./LiveReservation";
import LiveStart from "./LiveStart";
import BottomNavDark from "../Nav/BottomNavDark";
import styles from "./BuyLive.module.css";


export default function BuyLive() {
    return (
      <div>
      <div className={styles.text}>방송 중</div>
      <LiveReservation />
      <div className={styles.text}>라이브 예정</div>
      <LiveStart />
    </div>
    );
}

