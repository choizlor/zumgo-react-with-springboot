import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import SellItems from "../components/SellList/SellItems";
import Status from "../components/SellList/Status";

import styles from "./styles/SellList.module.css";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function SellList() {
  const filters = ["onsale", "inprogress", "soldout"];
  const navigate = useNavigate();
  const userId = useParams().userId;
  
  const [filter, setFilter] = useState(filters[0]);
  return (
    //전체 컨테이너
    <div className={styles.body}>
      {/**nav부분*/}
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-black-100" onClick={()=>{navigate(`/userinfo/${userId}`)}} />
        <div className={styles.title}>판매 목록</div>
      </div>
      {/*거래 상태 표시 */}
      <div className={styles.status}>
        <Status
          filters={filters}
          filter={filter}
          onFilterChange={(value) => {
            setFilter(value);
          }}
        />
        {/*해당 상태에 있는 아이템들만 setItems에 보내주기*/}
        <SellItems filter={filter} />
      </div>
    </div>
  ); 
}
