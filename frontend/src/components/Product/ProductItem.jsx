import React from 'react';
import styles from './ProductItem.module.css';
import testImg from '../../assets/images/testImg.jpg'

export default function ProductItem({product}) {
    return (
        <div className={styles.body}>
            <div className={styles.productimg}>
                <img src={testImg} alt="" />
            </div>
            <div className={styles.product}>
                <div className={styles.title}>문상훈 젤리 팔아요</div>
                <div className={styles.price}>10000원</div>
                <div className={styles.bottom}>
                    <div className={styles.status}>판매중</div>
                    <div className={styles.icons}>아이콘들</div>
                </div>
            </div>
            
        </div>
    );
}

