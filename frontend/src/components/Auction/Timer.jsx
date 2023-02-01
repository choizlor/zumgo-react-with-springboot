import React, { useEffect, useState } from "react";
import styles from '../Auction/Timer.module.css';


export default function Timer() {
  const [count, setCount] = useState(30);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    // 0이 되면 카운트가 멈춤
    if(count === 0) {
        clearInterval(id);
    }
    return () => clearInterval(id);
  }, [count]);

  return <div className={styles.timer}><span className={styles.count}>{count}</span></div>;
}
