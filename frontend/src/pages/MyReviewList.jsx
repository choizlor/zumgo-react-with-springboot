import React, { useEffect, useState } from "react";
import styles from "./styles/MyReviewList.module.css";
import {
  ChevronLeftIcon,
  ArrowRightIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import testImg from "../assets/images/testImg.jpg";

export default function MyReviewList() {
  const [modalOpen, setModalOpen] = useState(false);
  const reviews = [
    {
      title: "문상훈 키보드 팝니다 팔아요",
      img: testImg,
      price: "35000",
      comment: "판매자님이 친절하시고 물건이 깨끗해서 좋아요~~",
    },
    {
      title: "문상훈 키보드 팝니다 팔아요",
      img: testImg,
      price: "35000",
      comment: "판매자님이 친절하시고 물건이 깨끗해서 좋아요~~",
    },
  ];

  useEffect(() => {
    // 내가 쓴 리뷰 불러오는 api
  }, []);

  return (
    <div className={styles.body}>
      {/* 상단 네비게이션 */}
      <div className={styles.nav}>
        <div className={styles.navleft}>
          <ChevronLeftIcon className="w-6 h-6 text-black-100" />
        </div>
      </div>
      {/* 타이틀 */}
      <div className={styles.bigtitle}>
        내가 쓴 리뷰 목록 ({reviews.length})
      </div>
      <div className={styles.reviews}>
        {reviews.map((review, idx) => {
          return (
            <div key={idx} className={styles.reviewbox}>
              <div className={styles.review}>
                <div className={styles.top}>
                  <div className={styles.topleft}>
                    <img src={review.img} alt="" />
                  </div>
                  <div className={styles.topright}>
                    <div className={styles.title}>{review.title}</div>
                    <div className={styles.price}>{review.price}원</div>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <ArrowRightIcon />
                  <div className={styles.comment}>{review.comment}</div>
                </div>
              </div>
              <EllipsisVerticalIcon
                className={styles.more}
                onClick={() => {
                  setModalOpen(true);
                }}
              />
              { modalOpen ? <div className={styles.modal}>
                <div>수정하기</div>
                <div>삭제하기</div>
              </div> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniModal() {
  return (
    <div className={styles.modal}>
      <div>수정하기</div>
      <div>삭제하기</div>
    </div>
  );
}
