import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BottomNav.module.css";
import {
  HomeIcon,
  ChatBubbleOvalLeftIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import LiveIcon from "../../assets/images/LiveIcon.png";
import { useSelector } from "react-redux";

export default function BottomNav() {
  const userCode = useSelector((state) => {
    return state.user.userCode;
  });

  const navigate = useNavigate();
  return (
    <nav className={styles.body}>
      <HomeIcon
        className={styles.icon}
        onClick={() => {
          navigate("/");
        }}
      />
      <ChatBubbleOvalLeftIcon
        className={styles.icon}
        onClick={() => {
          if (!userCode) {
            alert("로그인이 필요한 서비스 입니다!");
            navigate("/login");
          } else {
          navigate("/chatlist");
          }
        }}
      />
      <div>
        <img
          className={styles.liveicon}
          onClick={() => {
            if (!userCode) {
              alert("로그인이 필요한 서비스 입니다!");
              navigate("/login");
            } else {
              navigate("/live");
            }
          }}
          src={LiveIcon}
          alt="live"
        />
      </div>
      <PlusCircleIcon
        className={styles.icon}
        onClick={() => {
          navigate("/addproduct", {
            state: {
              userId: 3,
            },
          });
        }}
      />
      <UserCircleIcon
        className={styles.icon}
        onClick={() => {
          if (!userCode) {
            alert("로그인이 필요한 서비스 입니다!");
            navigate("/login");
          } else {
            navigate(`/userinfo/${userCode}`);
          }
        }}
      />
    </nav>
  );
}
