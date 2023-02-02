import React, { useState, useEffect } from "react";
import styles from "./styles/AddProduct.module.css";
import { ChevronLeftIcon, CameraIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import testImg from "../assets/images/kim.png";
import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";

export default function AddProduct() {
  // redux 사용하기
  // const user = useSelector((state) => { return state.user});
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [reservation, setReservation] = useState("");
  const [photo, setPhoto] = useState([]);
  // const [userInfo, setUserInfo] = useState({});

  // 상품등록 axios
  const addProduct = () => {
    axios
      .post("http://localhost:8080/product", {
        title,
        price,
        description,
        reservation: "2010-10-14",
        photo: "아직이용",
        // user: userInfo,
        // status: 'INPROGRESS' //INPROGRESS, SOLD
      })
      .then((res) => {
        console.log(res.data);
        navigate(`detail/${res.data}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    console.log(e.target.value);
  };

  const handleReservationChange = (e) => {
    setReservation(e.target.value);
    console.log(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-black-100" />
        <div className={styles.title}>상품 등록하기</div>
      </div>
      <div className={styles.container}>
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
        {/* <div className={styles.addbtn}> */}
        <input
          className={`${styles.input} ${styles.titleinput}`}
          onChange={handleTitleChange}
          type="text"
          placeholder="제목"
        />
        <input
          className={styles.input}
          onChange={handlePriceChange}
          type="number"
          placeholder="$ 가격 (0원 가능)"
        />
        <textarea
          className={styles.textarea}
          onChange={handleReservationChange}
          placeholder="라이브 가능 시간 &#13;(ex - 10:00~12:00, 18:00~19:00)"
        ></textarea>
        <textarea
          className={`${styles.textarea} ${styles.descinput}`}
          onChange={handleDescriptionChange}
          placeholder="상품 설명(300자 이내)"
        ></textarea>
        <div className={styles.addbtn} onClick={addProduct}>
          <span>등록하기</span>
        </div>
      </div>
    </div>
  );
}
