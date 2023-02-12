import React from "react";
import styles from './Price.module.css';

export default function Price({
  handleBidPrice,
  setBidCount,
  myUserName,
  myProfileImg,
}) {
  return (
    <div className={styles.prices}>
      <button
        onClick={() => {
          setBidCount(1);
          handleBidPrice(100, myUserName, myProfileImg);
        }}
      >
        +100
      </button>
      <button
        onClick={() => {
          setBidCount(1);
          handleBidPrice(500, myUserName, myProfileImg);
        }}
      >
        +500
      </button>
      <button
        onClick={() => {
          setBidCount(1);
          handleBidPrice(1000, myUserName, myProfileImg);
        }}
      >
        +1000
      </button>
    </div>
  );
}
