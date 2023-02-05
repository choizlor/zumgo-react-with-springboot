import React from "react";
import styles from "./ProductItem.module.css";
import testImg from "../../assets/images/testImg.jpg";
import zImg from "../../assets/images/z.png";
import axios from 'axios';
import { HeartIcon } from "@heroicons/react/24/solid";
// import { useState } from "react";
import {useSelector} from '@reduxjs/toolkit'
export default function ProductItem({ product, clickProduct }) {
  // 현재 로그인 된 사용자 정보를 가져오는 방법
  const user = useSelector((state) => {return state.user})

  const addwish = ()=> {
    axios
    .post(`http://i8c110.p.ssafy.io:8080/wish?userCode=${user.userCode}&productId=${product.productId}`,{
    })
    .then((res) =>{
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  };
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
          <div className={styles.status}>판매중</div>
          <div className={styles.icons}>
            <div className={styles.icon}>
              <HeartIcon onClick={addwish} />
              <div className={styles.count}>2</div>
            </div>
            <div className={styles.icon}>
              <div className={styles.zimg}>
                <img src={zImg} alt="" />
              </div>
              <div className={styles.zcount}>2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
