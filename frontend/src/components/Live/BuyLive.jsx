import React from "react";
import styles from "./BuyLive.module.css";
import LiveCard from "./LiveCard";
import RequestLive from "./RequestLive";

export default function BuyLive({ myLiveRequestList }) {

  const requestList = myLiveRequestList?.filter((product) => {
    return product.reserve !== null;
  });

  return (
    <div>
      <div className={styles.text}>방송 중</div>
      <LiveCard />
      <div className={styles.text}>라이브 예정</div>
      {requestList?.map((product) => (
        <RequestLive key={product.id} product={product} />
      ))}
    </div>
  );
}
