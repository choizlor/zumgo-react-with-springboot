import React, { useEffect, useState } from "react";
import HomeBanner from "../components/Home/HomeBanner";
import BottomNav from "../components/Nav/BottomNav";
import TopNav from "../components/Nav/TopNav";
import z from "../assets/images/z.png";
import styles from "./styles/Home.module.css";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import ProductItem from "../components/Product/ProductItem";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState();

  // 판매 중인 전체 목록을 붑러옴
  useEffect(() => {
    axios
      .get("http://i8c110.p.ssafy.io:8080/products")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clickProduct = (id) => {
    navigate(`/detail/${id}`)
  }

  return (
    <div className={styles.background}>
      <TopNav />
      <HomeBanner />
      <div className={styles.body}>
        <div className={styles.onsale}>판매중</div>
        <div className={styles.scrollarea}>
          {products?.map((product) => {
            return (
              <ProductItem
                key={product.productId}
                product={product}
                clickProduct={clickProduct}
              />
            );
          })}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
