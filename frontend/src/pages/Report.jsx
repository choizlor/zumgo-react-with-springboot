import React from 'react';
import styles from './styles/Report.module.css'
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Report() {
    return (
        <div className={styles.body}>
          <div className={styles.nav}>
            <ChevronLeftIcon className="w-6 h-6 text-black-100" />
            <div className={styles.title}>신고하기</div>
          </div>
          <div className={styles.reportform}>
            <div className={styles.title}>뇸뇸이 님을 신고하는 이유를 작성해 주세요.</div>
            <textarea className={styles.reason} cols="30" rows="10" placeholder='신고 하는 이유를 상세히 기재해 주세요.'></textarea>

          </div>
        </div>
    );
}

