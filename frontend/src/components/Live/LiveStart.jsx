import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveStart.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function LiveStart() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const userId = useSelector((state) => {
    return state.user.userCode;
  });

  // useEffect(() => {
  //   axios
  //     .get(`http://i8c110.p.ssafy.io:8080/live/main?userCode=${userId}`)
  //     .then((res) => {
  //       setProduct(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const createSession = () => {
    axios
      .post("http://localhost:8080/live/room", {
        headers: {
          // Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div
        onClick={() => {
          navigate(`/live/${product.id}`);
        }}
        className={styles.image}
        style={{
          backgroundImage:
            "url('https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340')",
        }}
      >
        <p className={styles.title}>{product.title}</p>
        <button className={styles.btn}>라이브 시작하기</button>
      </div>
      <div
        onClick={() => {
          navigate(`/live/${product.id}`);
        }}
        className={styles.image}
        style={{
          backgroundImage:
            "url('https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3218672%2F32186720809.20220505182637.jpg&type=a340')",
        }}
      >
        <p className={styles.title}>product 이름</p>
        <button className={styles.btn}>라이브 시작하기</button>
      </div>
    </div>
  );
}
