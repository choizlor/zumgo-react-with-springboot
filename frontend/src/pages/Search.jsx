import React, { useState } from "react";
import SearchItems from "../components/Search/SearchItems";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "./styles/Search.module.css";
import axios from "axios";
import SearchList from "./SearchList";
import { useInView } from "react-intersection-observer";

export default function Search() {
  const [searchName, setSearchName] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();

  const handleSearchWord = (e) => {
    setSearchName(e.target.value);
  };

  const goSearch = () => {

    // 로컬 스토리지에 최근 검색어 저장하기
    
    axios
      .post("http://localhost:8080/product/search", {
        searchName: searchName,
        pageNo: 0,
        pageSize: 6,
      })
      .then((res) => {
        console.log(res.data, "🚗");
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon />
        <div className={styles.input}>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            onInput={handleSearchWord}
            value={searchName}
          />
        <MagnifyingGlassIcon onClick={goSearch} />
        </div>
      </div>
      {/* 최근 검색어 */}
      <SearchItems />
      <SearchList products={products} />
    </div>
  );
}
