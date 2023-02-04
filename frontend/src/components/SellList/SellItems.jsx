import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProductItem from "../Product/ProductItem";
import "./SellItem";
import SellItem from "./SellItem";

export default function SellItems({ filter }) {
  //총 상품 목록들
  console.log(filter)

  const [products, setProducts] = useState();
  const navigate = useNavigate();

  const filtered = getFilteredItems(products, filter);
  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((res) => {
        setProducts(res.data);
        console.log('😪')
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clickProduct = (id) => {
    navigate(`/detail/${id}`);
  };

  const getFilteredItems = (products, filter) => {
    console.log(products);
    return products.filter((product) => product.status === filter);
  };


  return (
    <ul>
      {filtered?.map((product) => (
        <ProductItem
          key={product.productId}
          product={product}
          clickProduct={clickProduct}
        />
      ))}
    </ul>
  );
}
