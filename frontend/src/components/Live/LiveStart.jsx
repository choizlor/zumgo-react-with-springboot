import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveStart.module.css";

export default function LiveStart() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        onClick={() => {
          navigate("/live/:productId");
          // navigate("/live/:productId", state:{id: product.id, title: product.title });
        }}
        className={styles.image}
        style={{
          backgroundImage:
            "url('https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340')",
        }}
      >
        <p className={styles.title}>product 이름</p>
        <button className={styles.btn}>라이브 시작하기</button>
      </div>
      <div
        onClick={() => {
          navigate("/live/:productId");
          // navigate("/live/:productId", state:{id: product.id, title: product.title });
        }}
        className={styles.image}
        style={{
          backgroundImage:
            "url('https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340')",
        }}
      >
        <p className={styles.title}>product 이름</p>
        <button className={styles.btn}>라이브 시작하기</button>
      </div>
    </div>
  );
}
