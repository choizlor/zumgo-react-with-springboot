import React, { useEffect, useState } from "react";
import { useRef } from "react";
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
  buyerCheck,
}) {
  const [count, setCount] = useState(seconds);
  const savedCallback = useRef();

  const callback = () => {
    if (count > 0) {
      setCount(count - 1);
    }
    if (count === 0) {
      setSeconds(0);
      if (bidders === 0 && (sellerCheck || !buyerCheck)) {
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
  };

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  });

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCount((count) => count - 1);

  //     if (bidCount > 1) {
  //       clearInterval(id)
  //     }

  //     // 0이 되면 카운트가 멈춤
  //     if (count === 0) {
  //       clearInterval(id);
  //       setSeconds(0);

  //       if (bidders === 0 && (sellerCheck || !buyerCheck)) {
  //         setNonCelebrity(true);
  //       }
  //       if (bidders === 1) {
  //         setCelebrity(true);
  //       }
  //       if (bidders >= 1) {
  //         setPriceOpen(true);
  //       }
  //       if (bidCount > 0) {
  //         setCelebrity(true);
  //       }
  //     }
  //   }, 1000);
  //   console.log(count);
  //   return () => clearInterval(id);
  // }, [count, seconds]);

  return (
    <div className={styles.timer}>
      <span className={styles.count}>{count}</span>
    </div>
  );
}
