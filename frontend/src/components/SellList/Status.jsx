import React from "react";
import styles from "./Status.module.css";
export default function Status({ filters, filter, onFilterChange }) {
  // console.log(filters,'🚗')
  return (
    <>
      <ul className={styles.btnblock}>
        {filters &&
          filters.map((value, index) => (
            <li key={index}>
              <button
                className={styles.btn}
                onClick={() => onFilterChange(value)}
              >
                {value}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
