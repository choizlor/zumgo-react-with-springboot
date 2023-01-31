import React from "react";
import LiveCard from "../components/Live/LiveCard";
import BottomNav from "../components/Nav/BottomNav";
import styles from './styles/Live.module.css'

export default function Live() {
  return (
    <div>
      <p>LIVE</p>
      <p className={styles.text}>예약 대기</p>
      <LiveCard />
      <p className={styles.text}>라이브 시작 가능</p>
      <LiveCard />
      {/* <BottomNav /> */}
    </div>
  );
}
