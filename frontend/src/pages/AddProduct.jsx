import React, { useState, useEffect } from "react";
import styles from "./styles/AddProduct.module.css";
import { ChevronLeftIcon, CameraIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import testImg from "../assets/images/kim.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AddProduct() {
  const navigate = useNavigate();
  // redux 사용하기
  const userId = useSelector((state) => {
    return state.user.userCode;
  });
  
  // const location = useLocation();
  // const { userId } = location.state;
  // console.log(location.state)
  

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [imgUrls, setImgUrls] = useState([]); // 업로드 할 이미지를 담을 변수

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
      .post("http://localhost:8080/product", formData, {
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

  const handleImgUrlsChange = (e) => {
    // setImgUrls([...imgUrls, e.target.file])
    // console.log(e.target.file)
    // console.log(imgUrls)
  };

  return (
    <form className={styles.body} onSubmit={handleSubmit}>
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
          // accept="image/*"
          capture="camera"
          name="imgurls"
          // style={{ visibility: "hidden" }}
          onChange={handleImgUrlsChange}
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
