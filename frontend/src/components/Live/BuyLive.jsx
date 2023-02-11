import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuyLive.module.css";
import LiveCard from "./LiveCard";
import RequestLive from "./RequestLive";

export default function BuyLive({ onairList, waitList }) {
  const navigate = useNavigate();

  const clickLive = (productId) => {
    navigate(`live/${productId}`)
  }

  return (
    <div>
      <div className={styles.text}>방송 중</div>
      <div>
        {onairList?.map((product) => {
          <LiveCard key={product.id} product={product} clickLive={clickLive} />;
        })}
      </div>
      <div className={styles.text}>라이브 예정</div>
      <div>
        {waitList?.map((product) => (
          <RequestLive key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
