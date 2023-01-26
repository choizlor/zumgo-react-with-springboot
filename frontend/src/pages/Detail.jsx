import React from "react";
import styles from "./styles/Detail.module.css";
import LiveBtn from "../components/Detail/LiveBtn";

export default function Detail() {
  return (
    <div className={styles.body}>
      {/* 상품 이미지 배너 */}
      <div className={styles.image}>
        <img
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340"
          alt=""
        />
      </div>

      {/* 상품 정보 container */}
      <div className={styles.container}>
        <div className={styles.seller}>
          <div className={styles.sellerImgBox}>
            <img
              src="https://sitem.ssgcdn.com/18/83/93/item/2097000938318_i1_1200.jpg"
              className={styles.sellerImg}
            />
          </div>
          <div className={styles.sellerName}>딸기우유 서녕</div>
        </div>
        <select name="" id="">
          <option value="">판매 중</option>
          <option value="">예약 중</option>
          <option value="">거래완료</option>
        </select>
        <div className={styles.title}>나이키 레거시 모자 판매합니다</div>
        <div className={styles.price}>10,000원</div>
        <div className={styles.desc}>
          제 머리가 큰 탓에 거의 착용도 못해 본,,, 그냥 새제품입니다.. 근데 이제
          포장지는 없는,, 라이브 요청 하시면 라이브도 가능합니다.. 저는
          취준생이걸랑요,,
        </div>
        <div className={styles.icons}>
          <div className={styles.zBox}>
            <img src="" alt="" />
            <div>2</div>
          </div>
          <div className={styles.chatBox}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
            </svg>
            <div>2</div>
          </div>
          <div className={styles.heartBox}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <div>5</div>
          </div>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.timeTitle}>Live 가능 시간대 :</span>
          <div className={styles.timeContent}>매일 오전 8시 이후</div>
        </div>
        <LiveBtn />
      </div>
    </div>
  );
}

