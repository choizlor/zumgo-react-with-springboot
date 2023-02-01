import React from "react";
import styles from "./SellItem.module.css";
import { Link } from "react-router-dom";
export default function SellItem({ product }) {
  return (
    <div className={styles.body}>
      <Link to="/detail/:productId"></Link>
      <div>
      {JSON.stringify(product.image)}
      </div>
      <div>
      {JSON.stringify(product.name)}
      </div>
      <div>
      {JSON.stringify(product.price)}
      </div>
      <div>
      {JSON.stringify(product.status)}
      </div>
    </div>
  );
}
