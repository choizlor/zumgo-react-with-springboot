import React from "react";
import { Link } from "react-router-dom";
import styles from "./TopNav.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/solid";

export default function TopNav() {
  return (
    <nav className={styles.body}>
      <Link to="/">
        <p className={styles.logo}>zum:go</p>
      </Link>
      <Link to="/search">
        <MagnifyingGlassIcon className={styles.icon} />
      </Link>
      <BellIcon className={styles.icon}/>
    </nav>
  );
}
