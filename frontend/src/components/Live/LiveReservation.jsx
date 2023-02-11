import React, { useState } from "react";
import styles from "./LiveReservation.module.css";
import ReservationModal from "./ReservationModal";

export default function LiveReservation({ product }) {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <div
        className={styles.image}
        style={{
          backgroundImage:
            "url('https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340')",
        }}
      >
        <p className={styles.title}>{product.title}</p>
        <button className={styles.btn} onClick={showModal}>
          시간 예약하기
        </button>
      </div>
      {modalOpen && (
        <ReservationModal
          setModalOpen={setModalOpen}
          productId={product.productId}
        />
      )}
    </div>
  );
}
