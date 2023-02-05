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
import { useRef } from "react";
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [ref, inView] = useInView();
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1); // 현재 페이지 번호 (페이지네이션)

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

  // 무한 스크롤
  // 지정한 타겟 div가 화면에 보일 때 마다 서버에 요청을 보냄
  const productFetch = () => {
    axios
    .get()
    .then((res) => {
      console.log(res.data);
      // 리스트 뒤로 붙여주기
      setProducts([...products, ...(res.data)])
      // get으로 받은 데이터의 길이가 백에서 보내주기로 한 리스트보다 짧으면(?)
      setHasNextPage(res.data.length === 5)
      // 불러온 데이터가 존재하기만 하면 다음 페이지로 처리 == 데이터가 0개 이면 마지막 현재 페이지를 마지막 페이지로
      if ( res.data.length ) {
        page.current +=1;
      }
    })
    .catch((err) => {console.log(err)});
  };

  useEffect(() => {
    console.log(inView)
    if (inView && hasNextPage) {
      productFetch();
    }
  }, [inView]);

  const clickProduct = (id) => {
    navigate(`/detail/${id}`);
  };

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
          <div ref={ref}>안녕</div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
