import React, { useEffect, useState } from "react";
import styles from "../Auction/Timer.module.css";

export default function Timer({
  seconds,
  setSeconds,
  currentSession,
  bidders,
  setPriceOpen,
  // setTimerOpen,
}) {
  // console.log(seconds)
  // const [count, setCount] = useState(seconds);
  const sendCount = () => {
    currentSession
      .signal({
        data: seconds,
        type: "timer",
      })
      .then(() => {
        console.log("timer good");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (seconds > 0) {
      sendCount();
    }
    const id = setInterval(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);
    // 0이 되면 카운트가 멈춤
    if (seconds === 0) {
      if (bidders > 1) {
        setPriceOpen(true);
      }
      // setTimerOpen(false); // 0초 이후에 timer가 사라짐
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [seconds]);

  return (
    <div className={styles.timer}>
      <span className={styles.count}>{seconds}</span>
    </div>
  );
}
