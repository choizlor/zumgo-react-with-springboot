import React from "react";
import styles from "./RequestLive.module.css";

export default function RequestLive({ product }) {
  console.log(product.reserve, '😉시간')
  const date = new Date(product.live_start_time);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
  var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
  var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
  var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)

  return (
    <div>
      <div
        className={styles.image}
        style={{
          backgroundImage:
          "url("+`${product.thumbnail}`+")",
        }}
      >
        <p className={styles.title}>{product.title}</p>
        <button className={styles.btn}>
          <div>
            {month}/{day}
          </div>
          <div>
            {hour}:{minute} 예정
          </div>
        </button>
      </div>
    </div>
  );
}
