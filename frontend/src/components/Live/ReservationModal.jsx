import React, { useState } from "react";
import styles from "./ReservationModal.module.css";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ReservationModal({ setModalOpen }) {
  const [selectDate, setSelectDate] = useState(new Date());

  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    setModalOpen(false);
  };
  return (
    <div className={styles.container}>
      <button onClick={handleSubmit}>예약하기</button>
      <XMarkIcon onClick={closeModal} className={styles.close} />
      <div className={styles.date}>
        <DatePicker
          locale={ko}
          selected={selectDate}
          onChange={(date) => setSelectDate(date)}
          showTimeInput
          dateFormat="Pp"
          minDate={new Date()}
          popperModifiers={{
            // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
            preventOverflow: {
              enabled: true,
            },
          }}
          
        />
      </div>
    </div>
  );
}
