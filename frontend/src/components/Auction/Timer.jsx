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
  sellerCheck,
  setTimerOpen,
}) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
      // 0이 되면 카운트가 멈춤
      if (count === 0) {
        clearInterval(id);
        setSeconds(0);

        if (bidders === 0 && sellerCheck) {
          setNonCelebrity(true);
        }
        if (bidders === 1) {
          setCelebrity(true);
        }
        if (bidders >= 1) {
          setPriceOpen(true);
        }
        if (bidCount > 0) {
          setCelebrity(true);
        }
      }
    }, 1000);
    console.log(count);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className={styles.timer}>
      <span className={styles.count}>{count}</span>
    </div>
  );
}
