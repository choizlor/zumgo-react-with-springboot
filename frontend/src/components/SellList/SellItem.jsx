import React from "react";
import styles from "./SellItem.module.css";
import { Link } from "react-router-dom";
export default function SellItem({ product }) {
  // const image = JSON.stringify(product.image).replace (/"/g,'');
  const name = JSON.stringify(product.name).replace(/"/g, "");
  const price = JSON.stringify(product.price).replace(/"/g, "");
  const status = JSON.stringify(product.status).replace(/"/g, "");
  return (
    <div className={styles.body}>
      <Link to="/detail/:productId">
        <div className={styles.image}>
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340"
            alt=""
          />
        </div>
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{price}</div>
        <div className={styles.status}>{status}</div>
      </Link>
    </div>
  );
}
