import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import styles from "./styles/BuyList.module.css";
import { useNavigate, useParams } from "react-router";

export default function BuyList() {
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
        <div className={styles.title}>구매 목록</div>
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
