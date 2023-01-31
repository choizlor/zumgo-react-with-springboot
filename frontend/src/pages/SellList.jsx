import React, { useState } from "react";
import styles from "./styles/SellList.module.css";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import SellListItems from "../components/SellList/SellListItems";
import Status from "../components/SellList/Status";

export default function SellList() {
  const filters = ['onsale','inprogess','soldout']
  const [filter,setFilter] = useState(filters[0]);

  return (
    //전체 컨테이너
    <div className={styles.body}>
      {/**nav부분  */}
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-black-100" />
        <div className={styles.title}>판매 목록</div>
      </div>
      {/*거래 상태 표시 */}
      <div>
        <Status filters={filters} filter={filter} onFilterChange={setFilter}/>
        <SellListItems filter={filter} />
      </div>
    </div>
  );
}
