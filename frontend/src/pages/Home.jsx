import React, { useEffect, useState } from "react";
import HomeBanner from "../components/Home/HomeBanner";
import BottomNav from "../components/Nav/BottomNav";
import TopNav from "../components/Nav/TopNav";
import z from "../assets/images/z.png";
import styles from "./styles/Home.module.css";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ProductItem from "../components/Product/ProductItem";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState();

  // 판매 중인 전체 목록을 붑러옴
  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <TopNav />
      <HomeBanner />
      <div className={styles.body}>
        {products?.map((product) => {
          return <ProductItem key={product.productId} product={product} />;
        })}
        {/* <Link to="/detail/:productId">
          <p className={styles.text}>판매 중</p>
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340"
            alt=""
            className={styles.image}
          />
          <p className={styles.title}>나이키 레거시 모자 판매합니다</p>
          <p>10,000원</p>
          <div className={styles.container}>
            <p>판매 중</p>               
            <div className={styles.icons}>
              <div className={styles.zBox}>
                <img src={z} className={styles.z} />
                <div>2</div>
              </div>
              <div className={styles.chatBox}>
                <ChatBubbleLeftRightIcon />
                <div>2</div>
              </div>
              <div className={styles.heartBox}>
                <HeartIcon /> 
                <div>5</div>
              </div>
            </div>
          </div>
        </Link> */}
        <BottomNav />
      </div>
    </div>
  );
}
