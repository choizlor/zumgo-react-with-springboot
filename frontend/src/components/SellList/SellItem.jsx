import React from "react";
import styles from "./SellItem.module.css";
import { Link } from "react-router-dom";
import z from "../../assets/images/z.png";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";





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
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.price}>{price}</div>
          <div className={styles.statusbox}>
            <div className={styles.status}>{status}</div>
            <div className={styles.icons}>
            <div className={styles.z}>
              <img src={z} className={styles.zimg} alt="" />
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
        </div>
      </Link>
    </div>
  );
}
