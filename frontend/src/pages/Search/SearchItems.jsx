import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "./SearchItems.module.css";

export default function SearchItems({ recents, searchProducts }) {
   
  return (
    <div className={styles.body}>
      <span className={styles.text}>최근 검색어</span>
      <div className={styles.wordcontainer}>
        {recents.map((word, idx) => (
          <div key={idx} className={styles.word} onClick={() => {searchProducts(word)}}>
            <span>{word}</span>
            <XMarkIcon className={styles.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
