import React from "react";
import styles from "./LiveCard.module.css";

export default function LiveCard({ product, clickLive }) {
  return (
    <div>
      <div
        className={styles.image}
        style={{
          backgroundImage:
            "url('https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340')",
        }}
      >
        <p className={styles.title}>{product.title}</p>
        <button
          className={styles.btn}
          onClick={() => {
            clickLive(product.id);
          }}
        >
          라이브 입장하기
        </button>
      </div>
    </div>
  );
}
