import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from './ReservationModal.module.css'

export default function ReservationModal({ setModalOpen }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <XMarkIcon onClick={closeModal} className={styles.close} />
      <p>날짜, 시간 선택</p>
    </div>
  );
}
