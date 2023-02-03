import React from "react";
import styles from "./SellLive.module.css";
import LiveReservation from "../../components/Live/LiveReservation.jsx";
import LiveStart from "../../components/Live/LiveStart.jsx";
export default function SellLive() {
  return (
    <div>
      <div className={styles.text}>예약 대기</div>
      <LiveReservation />
      <div className={styles.text}>라이브 시작 가능</div>
      <LiveStart />
    </div>
  );
}
