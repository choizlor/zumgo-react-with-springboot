import React from 'react';
import styles from "./styles/AddProduct.module.css"
import { ChevronLeftIcon, CameraIcon } from "@heroicons/react/24/solid";


export default function AddProduct() {
    return (
        <div className={styles.body}>
          <div className={styles.nav}>
            <ChevronLeftIcon className="w-6 h-6 text-black-100" />
            <div className={styles.title}>상품 등록하기</div>
          </div>
              <div className={styles.button}>
                <CameraIcon className={styles.camera}/>
                <div className={styles.num}>0/5</div>
              </div>
              <input
              className={styles.file}
                type="file"
                accept="image/*"
                capture="camera"
                multiple
              />
                
          </div>
    );
}

