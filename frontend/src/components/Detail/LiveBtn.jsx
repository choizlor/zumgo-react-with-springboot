import React from 'react';
import styles from './LiveBtn.module.css';

export default function LiveBtn({requestChat, requestLive}) {
  return (
    <div className={styles.body}>
      <div className={styles.blackBtn} onClick={requestChat}>
        <span>
          일반 채팅  
        </span>
      </div>
      <div className={styles.liveBtn} onClick={requestLive}>
        <span className={styles.livebtntitle}>LIVE 요청하기!</span>
        <span className={styles.livebtnpoint}>-2 pt</span>
      </div>
    </div>
  );
}

