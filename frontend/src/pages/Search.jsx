import React, { useState } from "react";
import SearchItems from "../components/Search/SearchItems";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import styles from "./styles/Search.module.css";
import axios from 'axios';


export default function Search() {
  const [search, setSearch] = useState("");


  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const goSearch = (() => {
    axios
    .post('http://localhost:8080/product/search',{
      search
    })
    .then((res) => {
      console.log(res)
    })git 
    .catch((err) =>{
      console.log(err)
    })
  })
  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-15 text-black-100" />
        <form onSubmit={goSearch}>
          <input
            type="text"
            className={styles.input}
            placeholder="검색어를 입력해주세요."
            onChange={handleSearch}
            value={search}
          />
        </form>
      </div>
      <SearchItems />
    </div>
    // <div>
    //     <span>검색페이지</span>
    // </div>
  );
}
