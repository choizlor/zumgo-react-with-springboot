import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import styles from "./styles/SellList.module.css";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import ProductItem from "../components/Product/ProductItem";
import BottomNav from "../components/Nav/BottomNav"


export default function SellList() {
  //status 상태
  const filters = ["ONSALE", "BOOKING", "SOLDOUT"];
  // filterText 변경
  const filterText = ["판매 중", "예약 중", "판매완료"];
  const navigate = useNavigate();
  const userId = useParams().userId;
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("ONSALE");
  const [filtered, setFiltered] = useState();

  useEffect(() => {
    axios
      .get(`https://i8c110.p.ssafy.io/api/v1/products/sellList/${userId}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(filter,'======')
      handleChangeStatus(filter)
      console.log(products,'-------')
  }, []);

  const clickProduct = (id) => {
    navigate(`/detail/${id}`);
  };
  // filter
  const handleChangeStatus = (filter) => {
    setFilter(filter);
    setFiltered(getFilteredItems(filter));
  };

  // console.log(filter);

  const getFilteredItems = (filter) => {
    return products?.filter((product) => product.status === filter);
  };

  return (
    //전체 컨테이너
    <div className={styles.body}>
      {/**nav부분*/}
      <div className={styles.nav}>
        <ChevronLeftIcon
          className="w-6 h-6 text-black-100"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className={styles.title}>판매 목록</div>
      </div>
      {/*거래 상태 표시 */}
        <div className={styles.statusnav}>
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
        </div>
        <div className={styles.status}>
        <ul>
          {/**filtered된 product리스트 productitem에 보여주기 */}
          {filtered?.map((product) => (
            <ProductItem
              key={product.productId}
              product={product}
              clickProduct={clickProduct}
            />
          ))}
        </ul>
      </div>
      <BottomNav />   
    </div>
  );
}
