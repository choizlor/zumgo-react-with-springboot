import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveStart.module.css";

export default function LiveStart() {
  const navigate = useNavigate();
  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate("/live/:productId");
      }}
    >
      라이브 시작하기
    </div>
  );
}
