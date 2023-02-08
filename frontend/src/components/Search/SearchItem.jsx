import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "./SearchItem.module.css";

export default function SearchItem({ word }) {
  return (
      <div className={styles.word}>
        <span>{word}</span>
          <XMarkIcon className={styles.icon}/>
      </div>
  );
}
