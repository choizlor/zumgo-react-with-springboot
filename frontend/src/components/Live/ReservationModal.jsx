import React, { useEffect, useState } from "react";
import styles from "./ReservationModal.module.css";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

import { XMarkIcon, ClockIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function ReservationModal({ setModalOpen }) {
  const [reserve, setReserve] = useState(new Date());
  const [product, setProduct] = useState({});

  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 상품정보 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/10`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    setModalOpen(false);

    axios
      .put("http://localhost:8080/product/10", {
        title: product.title,
        price: product.price,
        description: product.description,
        photo: product.photo,
        status: product.status,
        reserve,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        <ClockIcon className={styles.icon} />
        라이브 예약하기
      </p>
      <XMarkIcon onClick={closeModal} className={styles.close} />
      <div className={styles.date}>
        <DatePicker
          locale={ko}
          selected={reserve}
          onChange={(date) => setReserve(date)}
          showTimeInput
          dateFormat="Pp"
          minDate={new Date()}
          popperModifiers={{
            // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
            preventOverflow: {
              enabled: true,
            },
          }}
          className={styles.datepicker}
        />
        <button onClick={handleSubmit} className={styles.btn}>
          예약하기
        </button>
      </div>
    </div>
  );
}
