import React, { useState } from "react";
import SearchItems from "../components/Search/SearchItems";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import styles from "./styles/Search.module.css";
import axios from 'axios';


export default function Search() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);


  const handleSearchWord = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(search)
  };

  // const gogoSearch  = () => {
  //   axios.post
  // }

  const goSearch = () => {
    axios
    .post('http://localhost:8080/product/search', search)
    .then((res) => {
      console.log(res.data, '🚗')
      setProducts(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className={styles.body}>
      {products}
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-15 text-black-100" />
        {/* <form onSubmit={goSearch}> */}
          <input
            type="text"
            className={styles.input}
            placeholder="검색어를 입력해주세요."
            onInput={handleSearchWord}
            value={search}
          />
        {/* </form> */}
        <button onClick={goSearch}>검색</button>
      </div>
      <SearchItems />
    </div>
    // <div>
    //     <span>검색페이지</span>
    // </div>
  );
}
