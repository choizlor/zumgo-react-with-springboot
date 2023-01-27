import styles from "./AlertModal.module.css";
import { XMarkIcon, BellAlertIcon } from "@heroicons/react/24/outline";

export default function AlertModal({ setModalOpen }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <XMarkIcon onClick={closeModal} className={styles.close} />
      <div className={styles.scrollbox}>
        <p className={styles.text}>
          <BellAlertIcon className={styles.icon} />
          냠냠이 님의 “아이패드 팔아요” LIVE 3시 예정!
        </p>
        <hr className={styles.hr} />
        <p className={styles.text}>
          <BellAlertIcon className={styles.icon} />
          냠냠이 님의 “아이패드 팔아요” LIVE 3시 예정!
        </p>
        <hr className={styles.hr} />
        <p className={styles.text}>
          <BellAlertIcon className={styles.icon} />
          냠냠이 님의 “아이패드 팔아요” LIVE 3시 예정!
        </p>
      </div>
    </div>
  );
}
