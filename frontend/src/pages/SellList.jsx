import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import styles from "./styles/SellList.module.css";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import ProductItem from "../components/Product/ProductItem";

export default function SellList() {
  const filters = ["ONSALE", "BOOKING", "SOLDOUT"];
  const filterText = ["판매 중", "예약 중", "판매완료"];
  const navigate = useNavigate();
  const userId = useParams().userId;

  const [products, setProducts] = useState();
  const [filter, setFilter] = useState(filters[0]);
  const [filtered, setFiltered] = useState();

  useEffect(() => {
    axios
      .get(`https://i8c110.p.ssafy.io:8080/products/sellList/${userId}`)
      .then((res) => {
        setProducts(res.data);
        console.log("😪");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clickProduct = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleChangeStatus = (filter) => {
    setFilter(filter);
    setFiltered(getFilteredItems(filter));
  };

  console.log(filter);

  const getFilteredItems = (filter) => {
    return products.filter((product) => product.status === filter);
  };

  return (
    //전체 컨테이너
    <div className={styles.body}>
      {JSON.stringify(products)}
      {/**nav부분*/}
      <div className={styles.nav}>
        <ChevronLeftIcon
          className="w-6 h-6 text-black-100"
          onClick={() => {
            navigate(`/userinfo/${userId}`);
          }}
        />
        <div className={styles.title}>판매 목록</div>
      </div>
      {/*거래 상태 표시 */}
      <div className={styles.status}>
        {filters.map((filter, index) => {
          return (
            <li key={index} className={styles.block}>
              <div
                onClick={() => handleChangeStatus(filter)}
                className={styles.btn}
              >
                {filterText[index]}
              </div>
            </li>
          );
        })}
        <ul>
          {filtered?.map((product) => (
            <ProductItem
              key={product.productId}
              product={product}
              clickProduct={clickProduct}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
