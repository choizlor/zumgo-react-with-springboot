import React from "react";
import { Link } from "react-router-dom";
import styles from "./BottomNav.module.css";
import {
  HomeIcon,
  ChatBubbleOvalLeftIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import LiveIcon from "../../assets/images/LiveIcon.png";

export default function BottomNav() {
  return (
    <nav className={styles.body}>
      <Link to="/">
        <HomeIcon className={styles.icon} />
      </Link>
      <Link to="/chatlist">
        <ChatBubbleOvalLeftIcon className={styles.icon} />
      </Link>
      <Link to="/live">
        <img className={styles.liveicon} src={LiveIcon} />
      </Link>
      <Link to="/addproduct">
        <PlusCircleIcon className={styles.icon} />
      </Link>
      <Link to="/userinfo">
        <UserCircleIcon className={styles.icon} />
      </Link>
    </nav>
  );
}
