import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import styles from "./styles/PickList.module.css";
import axios from "axios";

export default function PickList() {
  const navigate = useNavigate();
  const userId = useParams().userId;
  const [products, setProducts] = useState();

  // useEffect(() => {
  //   axios
  //     .get("")
  //     .then((res) => {
  //       setProducts(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
      {/* <div className={styles.scrollarea}>
          {products?.map((product) => {
            return (
              <ProductItem
                key={product.productId}
                product={product}
                clickProduct={clickProduct}
              />
            );
          })}
        </div> */}
    </div>
  );
}
