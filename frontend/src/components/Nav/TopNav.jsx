import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TopNav.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/solid";
import AlertModal from "../Home/AlertModal";

export default function TopNav() {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <nav className={styles.body}>
      <Link to="/">
        <p className={styles.logo}>zum:go</p>
      </Link>
      <div className={styles.container}>
        <Link to="/search">
          <MagnifyingGlassIcon className={styles.glassicon} />
        </Link>
        <BellIcon onClick={showModal} />
        {modalOpen && <AlertModal setModalOpen={setModalOpen} />}
      </div>
    </nav>
  );
}
