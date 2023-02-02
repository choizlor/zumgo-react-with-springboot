import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./BottomNav.module.css";
import {
  HomeIcon,
  ChatBubbleOvalLeftIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import LiveIcon from "../../assets/images/LiveIcon.png";

export default function BottomNav() {

  const navigate = useNavigate();
  return (
    <nav className={styles.body}>
        <HomeIcon className={styles.icon} onClick={() => { navigate('/') }} />
        <ChatBubbleOvalLeftIcon className={styles.icon} onClick={() => { navigate('/chatlist') }}/>
        <div><img className={styles.liveicon} onClick={() => { navigate('/live') }} src={LiveIcon} alt="live" /></div>
        <PlusCircleIcon className={styles.icon} onClick={() => { navigate('/addproduct') }}/>
        <UserCircleIcon className={styles.icon} onClick={() => { navigate('/userinfo') }}/>
    </nav>
  );
}
