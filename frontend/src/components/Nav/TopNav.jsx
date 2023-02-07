import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./TopNav.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/solid";
import AlertModal from "../Home/AlertModal";

export default function TopNav() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <nav className={styles.body}>
      <div className={styles.contentbox}>
        <div
          className={styles.logo}
          onClicK={() => {
            navigate("/");
          }}
        >
          zum:go
        </div>
        <div className={styles.rightbox}>
          <MagnifyingGlassIcon
            className={styles.glassicon}
            onClick={() => {
              navigate("/search");
            }}
          />
          <BellIcon onClick={showModal} className={styles.bellicon}/>
        </div>
      </div>
      {modalOpen && <AlertModal setModalOpen={setModalOpen} />}
    </nav>
  );
}
