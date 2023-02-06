import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "./SearchItem.module.css";

export default function SearchItem({ word }) {
  const { content } = word;
  return (
      <div className={styles.word}>
        <span>{content}</span>
          <XMarkIcon className={styles.icon}/>
      </div>
  );
}
