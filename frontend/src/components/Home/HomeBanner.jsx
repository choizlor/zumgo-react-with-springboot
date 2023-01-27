import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeBanner.module.css'

export default function HomeBanner() {
    return (
        <div className={styles.box}>
            <p className={styles.font}>중고 거래,</p>
            <p className={styles.font}>줌고로 생생하게!</p>
            <button className={styles.loginbtn}><Link to="/login">로그인하기</Link></button>
        </div>
    );
}
