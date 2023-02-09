import React from "react";
import styles from "./ProductItem.module.css";
import testImg from "../../assets/images/testImg.jpg";
import zImg from "../../assets/images/z.png";
import axios from "axios";
import { HeartIcon } from "@heroicons/react/24/solid";
// import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProductItem({ product, clickProduct }) {

  // 현재 로그인 된 사용자 정보를 가져오는 방법
  const user = useSelector((state) => {
    return state.user;
  });

  
  return (
    <div
      className={styles.body}
      onClick={() => {
        clickProduct(product.productId);
      }}
    >
      <div className={styles.productimg}>
        <img src={testImg} alt="" />
      </div>
      <div className={styles.product}>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>{product.price}원</div>
        <div className={styles.bottom}>
          <div
            className={styles.status}
            style={
              product.status === "ONSALE"
                ? { backgroundColor: "black", color: "white" }
                : { backgroundColor: "#d9d9d9" }
            }
          >
            {product.status === 'ONSALE' && '판매중'}
            {product.status === 'BOOKING' && '예약중'}
            {product.status === 'SOLDOUT' && '거래완료'}
          </div>
          <div className={styles.icons}>
            <div className={styles.icon}>
              {product.wishCheck ? (
                <HeartIcon class="fill-black" />
              ) : (
                <HeartIcon />
              )}
              <div className={styles.count}>{product.wishSize}</div>
            </div>
            <div className={styles.icon}>
              <div className={styles.zimg}>
                <img src={zImg} alt="" />
              </div>
              <div className={styles.zcount}>{product.liveReqSize}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
