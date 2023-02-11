import React, { useEffect, useState } from "react";
import styles from "../Auction/Timer.module.css";

export default function Timer({
  seconds,
  setSeconds,
  currentSession,
  bidders,
  setPriceOpen,
  bidCount,
  setCelebrity,
  setNonCelebrity,
  // setTimerOpen,
}) {
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
        setSeconds((seconds) => {
          return seconds - 1;
        });
      }
      // 0이 되면 카운트가 멈춤
      if (seconds === 0) {
        clearInterval(id);
        if (bidders === 0) {
          setNonCelebrity(true);
        }
        if (bidders === 1) {
          setCelebrity(true);
        }
        if (bidders > 1) {
          setPriceOpen(true);
        }
        if (bidCount > 0) {
          setCelebrity(true);
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return (
    <div className={styles.timer}>
      <span className={styles.count}>{seconds}</span>
    </div>
  );
}
