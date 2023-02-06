import React from "react";
import styles from './Price.module.css';

export default function Price({
  handleBidPrice,
  setBidCount,
  myUserName,
  setBestBidder,
}) {
  return (
    <div className={styles.prices}>
      <button
        onClick={() => {
          setBidCount(1);
          handleBidPrice(100, myUserName);
          // setBestBidder(myUserName);
        }}
      >
        +100
      </button>
      <button
        onClick={() => {
          setBidCount(1);
          handleBidPrice(500, myUserName);
          // setBestBidder(myUserName);
        }}
      >
        +500
      </button>
      <button
        onClick={() => {
          setBidCount(1);
          handleBidPrice(1000, myUserName);
          // setBestBidder(myUserName);
        }}
      >
        +1000
      </button>
    </div>
  );
}
