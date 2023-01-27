import React, { useState } from "react";
import styles from "./styles/Detail.module.css";
import LiveBtn from "../components/Detail/LiveBtn";
import z from '../assets/images/z.png';
import DetailModal from "../components/Detail/DetailModal";

// heroicons
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/outline';
// swiper - 이미지 슬라이더
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation , Pagination } from "swiper";

export default function Detail() {

  const [modalOpen, setModalOpen] = useState(false);
  

  return (
    <div className={styles.body}>
      {/* 상품 이미지 배너 */}
      <Swiper className={styles.image} navigation={true} pagination={true} modules={[Navigation, Pagination]}>
        <SwiperSlide>
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340"
            alt=""
          />
        </SwiperSlide>
      </Swiper>

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
        {/* 드롭다운 */}
        <select 
          className={styles.dropdown} 
          onChange={(e) => {
            if(e.target.value === '거래완료') {
              setModalOpen(true)
            } else {
              setModalOpen(false)
            }
          }} 
          name="" id=""
        >
          <option value="판매 중">판매 중</option>
          <option value="예약 중">예약 중</option>
          <option value="거래완료">거래완료</option>
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
            <div className={styles.z}>
              <img src={z} className={styles.zimg} alt="" />
            </div>
            <div className={styles.count}>2</div>
          </div>
          <div className={styles.chatBox}>
            <ChatBubbleLeftRightIcon />
            <div className={styles.count}>2</div>
          </div>
          <div className={styles.heartBox}>
            <HeartIcon />
            <div className={styles.count}>5</div>
          </div>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.timeTitle}>Live 가능 시간대 :</span>
          <div className={styles.timeContent}>
            <span>
              매일 오전 8시 이후
            </span>
          </div>
        </div>
        <LiveBtn />
      </div>
      { modalOpen ? <DetailModal setModalOpen={setModalOpen}/> : null}
    </div>
  );
}

