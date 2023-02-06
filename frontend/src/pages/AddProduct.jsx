import React, { useState, useEffect } from "react";
import styles from "./styles/AddProduct.module.css";
import { ChevronLeftIcon, CameraIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import testImg from "../assets/images/kim.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function AddProduct() {
  
  // redux 사용하기
  const userId = useSelector((state) => {
    console.log("userId :", state.user.userCode);
    return state.user.userCode;
  });


  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [reservation, setReservation] = useState("");
  const [imgUrls, setImgUrls] = useState([]); // 업로드 할 이미지를 담을 변수


  const content = {
    title,
    price,
    description,
    reservation  :'2014-01-31',
    status: "ONSALE",
    user: userId,
  };


  // 상품등록 axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    let formData = new FormData();

    let files = e.target.imgurls.files;
    console.log(e.target.imgurls.files);

    // formData.append('imgUrl', files)
    for (let i = 0; i < files.length; i++) {
      formData.append("imgUrl", files[i], { type: "multipart/form-data" });
    }
    
    console.log(title)

    

    formData.append(
      "content",
      new Blob([JSON.stringify(content)], { type: "application/json" })
    );



    await axios
      .post("http://localhost:8080/product", formData, {
        headers: {
          "Context-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


      for (var key of formData.keys()) {

        console.log(key, formData.get(key),'👩');
      
      }

  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleReservationChange = (e) => {
    setReservation(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImgUrlsChange = (e) => {
    setImgUrls([...imgUrls, e.target.file])
    console.log(e.target.file)
    console.log(imgUrls)
  }

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
          onChange={handleReservationChange}
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
