import React from "react";
import styles from "./SellItem.module.css";
import { Link } from "react-router-dom";
export default function SellItem({ product }) {
  return (
    <div className={styles.body}>
      <Link to="/detail/:productId"></Link>
      <div className={styles.image}>
      {JSON.stringify(product.image)}
      </div>
      <div className={styles.name}>
      {JSON.stringify(product.name)}
      </div>
      <div className={styles.price}>
      {JSON.stringify(product.price)}
      </div>
      <div className={styles.status}>
      {JSON.stringify(product.status)}
      </div>
    </div>
  );
}
