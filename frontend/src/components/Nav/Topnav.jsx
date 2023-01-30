import React from "react";
import { Link } from "react-router-dom";
import styles from "./TopNav.module.css";

export default function TopNav() {
  return (
    <nav>
      zum:go |
      <Link to="/search">search</Link>
    </nav>
  );
}
