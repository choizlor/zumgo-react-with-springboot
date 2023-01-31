import React, { useState } from "react";
import styles from "./LiveReservation.module.css";
import ReservationModal from "./ReservationModal";

export default function LiveReservation() {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <div className={styles.container} onClick={showModal}>
        예약 대기 라이브
      </div>
      {modalOpen && <ReservationModal setModalOpen={setModalOpen} />}
    </div>
  );
}
