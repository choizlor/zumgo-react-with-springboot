import React, { useState, useEffect } from "react";
import styles from "./styles/AddProduct.module.css";
import { ChevronLeftIcon, CameraIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import testImg from "../assets/images/kim.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AddProduct() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { userId } = location.state;
  // console.log(location.state)
  
  // redux
  const userId = useSelector((state) => {
    return state.user.userCode;
  });
  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [availableTime, setAvailableTime] = useState("");

  const content = {
    title,
    price,
    description,
    availableTime,
    status: "ONSALE",
    userId,
  };

  // 상품등록 axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    let files = e.target.imgurls.files;

    for (let i = 0; i < files.length; i++) {
      formData.append("imgUrl", files[i]);
    }

    formData.append(
      "content",
      new Blob([JSON.stringify(content)], { type: "application/json" })
    );

    await axios
      .post("https://i8c110.p.ssafy.io:8080/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // navigate(`/detail/${res.data}`)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });


    // formData에 저장된 값 확인 하기  
    for (var key of formData.keys()) {
      console.log(key, formData.get(key), "👩");
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleAvailableTimeChange = (e) => {
    setAvailableTime(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  

  return (
    <form className={styles.body} onSubmit={handleSubmit}>
      <div className={styles.nav}>
        <ChevronLeftIcon className="w-6 h-6 text-black-100" onClick={() => {navigate(-1)}}/>
        <div className={styles.title}>상품 등록하기</div>
      </div>
      <div className={styles.container}>
        <div className={styles.button}>
          <CameraIcon className={styles.camera} />
          <div className={styles.num}>0/5</div>
        </div>

        <input
          className={styles.file}
          type="file"          // 파일로 입력 받음
          accept="image/*"     // 이미지 유형의 파일만 받기
          capture="camera"     // 모바일에서 직접 카메라가 호출될 수 있도록 하는,,,근데 이제,, 나는 안해본,,
          name="imgurls"       // 담긴 파일을 참조할 때 사용할 이름
          multiple            // 다중 업로드
        />

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
          onChange={handleAvailableTimeChange}
          placeholder="라이브 가능 시간 &#13;(ex - 10:00~12:00, 18:00~19:00)"
        ></textarea>
        <textarea
          className={`${styles.textarea} ${styles.descinput}`}
          onChange={handleDescriptionChange}
          placeholder="상품 설명(300자 이내)"
        ></textarea>
        <button type="submit" className={styles.addbtn}>
          <span>등록하기</span>
        </button>
      </div>
    </form>
  );
}
