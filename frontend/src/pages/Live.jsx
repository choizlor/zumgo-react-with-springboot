import React, { useState } from "react";
import LiveReservation from "../components/Live/LiveReservation";
import LiveStart from "../components/Live/LiveStart";
import BottomNav from "../components/Nav/BottomNav";
import styles from "./styles/Live.module.css";

export default function Live() {
  return (
    <div>
      <p className={styles.logo}>LIVE</p>
      <p className={styles.text}>예약 대기</p>
      <LiveReservation />
      
      <p className={styles.text}>라이브 시작 가능</p>
      <LiveStart />
      <BottomNav />
    </div>
  );
}
