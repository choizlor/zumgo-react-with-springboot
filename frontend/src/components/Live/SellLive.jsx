import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SellLive.module.css";
import LiveReservation from "../../components/Live/LiveReservation.jsx";
import LiveStart from "../../components/Live/LiveStart.jsx";

export default function SellLive({ sellLiveRequestList }) {
  const navigate = useNavigate();

  const clickLive = (productId) => {
    navigate(`/live/${productId}`);
  };

  const reserveList = sellLiveRequestList?.filter((product) => {
    return product.reserve === null;
  });

  const startList = sellLiveRequestList?.filter((product) => {
    return product.reserve !== null;
  });

  console.log(reserveList, "😀");

  return (
    <div className={styles.body}>
      <div className={styles.text}>예약 대기</div>
      <div className={styles.cardbox}>
        {reserveList?.map((product) => (
          <LiveReservation key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.text}>라이브 시작 가능</div>
      <div className={styles.cardbox}>
        {startList?.map((product) => (
          <LiveStart key={product.id} product={product} clickLive={clickLive} />
        ))}
      </div>
    </div>
  );
}
