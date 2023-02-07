import React, { useEffect, useState } from "react";
import SearchItems from "../components/Search/SearchItems";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "./styles/Search.module.css";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import ProductItem from "../components/Product/ProductItem";

export default function Search() {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [recentOpen, setRecentOpen] = useState(true);
  const [ref, inView] = useInView();
  const [storeRecent, setStoreRecent] = useState(false);

  useEffect(() => {
    if (inView) {
      productFetch();
    }
  }, [inView]);


  const handleSearchWord = (e) => {
    setSearchName(e.target.value);
    if (e.target.value === "") {
      setRecentOpen(true);
    }
    
  };

  const productFetch = () => {
    axios
      .post("http://localhost:8080/product/search", {
        searchName: searchName,
        pageNo: page,
        pageSize: 6,
      })
      .then((res) => {
        setProducts([...products, ...res.data]);
        setRecentOpen(false);
        setPage(() => page + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goSearch = (e) => {
    e.preventDefault();

    // 검색어를 입력하지 않으면 리턴
    if (searchName === "") {
      alert("검색어를 입력하세요.");
      return;
    }

    productFetch();

    setStoreRecent(!storeRecent)
    console.log(storeRecent)
  };

  const handleClickProduct = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <form className={styles.input} onSubmit={goSearch}>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            onInput={handleSearchWord}
            value={searchName}
          />
          <MagnifyingGlassIcon onClick={goSearch} />
        </form>
      </div>
      {/* 최근 검색어 & 검색된 내용 리스트*/}
      {recentOpen ? (
        <SearchItems />
      ) : (
        <div className={styles.searchlist}>
          {products.length > 0 ? (
            products?.map((product) => (
              <ProductItem
                key={product.productId}
                product={product}
                clickProduct={handleClickProduct}
              />
            ))
          ) : (
            <div className={styles.noresults}>검색 결과가 없습니다.</div>
          )}
          <div className={styles.ref} ref={ref}></div>
        </div>
      )}
    </div>
  );
}
