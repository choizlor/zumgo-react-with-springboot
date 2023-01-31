import React, { useState } from "react";
import styles from "./styles/AddProduct.module.css";
import { ChevronLeftIcon, CameraIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import testImg from '../assets/images/kim.png';
// import { useSelector } from "react-redux";

export default function AddProduct() {
  // redux 사용하기
  // const user = useSelector((state) => { return state.user});
  
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [reservation, setReservation] = useState('');
  const [photos, setPhotos] = useState([]);

  // 상품등록 axios
  const addProduct = () => {
    axios.post(`http://localhost:8080/product`, {
      title: '피치우롱',
      price : 5400,
      description : '마라탕 먹고 먹기에 딱',
      reservation : '평일 이후요',
      photos : [ testImg ],
    });
  };
  

  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-black-100" />
        <div className={styles.title}>상품 등록하기</div>
      </div>
      <div className={styles.button}>
        <CameraIcon className={styles.camera} />
        <div className={styles.num}>0/5</div>
      </div>
      <input
        className={styles.file}
        type="file"
        accept="image/*"
        capture="camera"
        multiple
      />
      <div className={styles.addbtn} onClick={addProduct}>
      {/* <div className={styles.addbtn}> */}
        <span>등록하기</span>
      </div>
    </div>
  );
}
