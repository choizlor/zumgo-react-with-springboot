import React from "react";
import SearchItems from "../components/Search/SearchItems";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import styles from './styles/Search.module.css'


export default function Search() {
  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon
          className="w-6 h-15 text-black-100"
        />
      <input type="text" className={styles.input} placeholder="검색어를 입력해주세요." />
      </div>
      <SearchItems />
    </div>
    // <div>
    //     <span>검색페이지</span>
    // </div>
  );
}
