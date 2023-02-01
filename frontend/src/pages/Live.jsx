import React, { useState } from "react";
import LiveReservation from "../components/Live/LiveReservation";
import LiveStart from "../components/Live/LiveStart";
import BottomNavDark from "../components/Nav/BottomNavDark";
import styles from "./styles/Live.module.css";

export default function Live() {
  return (
    <div className={styles.body}>
      <div className={styles.logo}>LIVE</div>

      <div className={styles.text}>예약 대기</div>
      <LiveReservation />
      <div className={styles.text}>라이브 시작 가능</div>
      <LiveStart />
      {/* toggle 사용 */}
      <BottomNavDark />
    </div>
  );
}
