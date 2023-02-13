import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector} from 'react-redux'
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import styles from "./styles/WishList.module.css";
import axios from "axios";
import ProductItem from "../components/Product/ProductItem";

export default function WishList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState();


  const userId = useSelector((state) => { return state.user.userCode})
  const clickProduct = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    axios
      .get(`https://i8c110.p.ssafy.io/api/v1/products/wishList/${userId}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon
          className="w-6 h-6 text-black-100"
          onClick={() => {
            navigate(`/userinfo/${userId}`);
          }}
        />
        <div className={styles.title}>관심 목록</div>
      </div>
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
    </div>
  );
}
