import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SellLive.module.css";
import LiveReservation from "../../components/Live/LiveReservation.jsx";
import LiveStart from "../../components/Live/LiveStart.jsx";

export default function SellLive({ sellLiveRequestList }) {
  const navigate = useNavigate();

  const clickLive = (id) => {
    navigate(`/live/${id}`);
  };

  const reserveList = sellLiveRequestList?.filter((product) => {
    return product.reserve === null;
  });

  const startList = sellLiveRequestList?.filter((product) => {
    return product.reserve !== null;
  });

  console.log(reserveList, "😀");

  return (
    <div>
      <div className={styles.text}>예약 대기</div>
      {reserveList?.map((product) => (
        <LiveReservation key={product.id} product={product} />
      ))}
      <div className={styles.text}>라이브 시작 가능</div>
      {startList?.map((product) => (
        <LiveStart key={product.id} product={product} clickLive={clickLive} />
      ))}
    </div>
  );
}
