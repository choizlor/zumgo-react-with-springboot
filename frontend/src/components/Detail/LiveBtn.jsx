import React from 'react';
import styles from './LiveBtn.module.css';

export default function LiveBtn() {
  return (
    <div className={styles.body}>
      <div className={styles.blackBtn}>
        <span>
          일반 채팅  
        </span>
      </div>
      <div className={styles.liveBtn}>
        <div>LIVE 요청하기!</div>
        <div>-2 pt</div>
      </div>
    </div>
  );
}

