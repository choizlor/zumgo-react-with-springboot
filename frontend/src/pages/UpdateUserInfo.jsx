import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

import styles from "./styles/UpdateUserInfo.module.css";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function UpdateUserInfo() {
  const param = useParams();
  const navigate = useNavigate();
  const userId = param.userId;
  const me = useSelector((state) => {
    return state.user;
  });

  const [nickname, setNickname] = useState(me.kakaoNickname);

  const handleUpdate = () => {
    axios
      .patch(`http://i8c110.p.ssafy.io/api/user/${userId}`, {
        profileImg: 'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
        nickname,
      })
      .then((res) => {
        navigate(`/userinfo/${userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.nav}>
          <div className={styles.navleft}>
            <ChevronLeftIcon
              className="w-6 h-6 text-black-100"
              onClick={() => {
                navigate(`/userinfo/${userId}`);
              }}
            />
            <div className={styles.title}>프로필 수정</div>
          </div>
          <div className={styles.navright} onClick={handleUpdate}>
            <p className={styles.save}>저장</p>
          </div>
        </div>

        <div className={styles.userimg}>
          <img
            src={me.kakaoProfileImg}
            alt=""
            style={{ borderRadius: "100px" }}
          />
          {/* <input
            className={styles.file}
            type="file"
            accept="image/*"
            capture="camera"
            multiple
          /> */}
        </div>

        <div className={styles.udtnickname}>
          <div className={styles.nickname}>별명</div>
          <textarea
            className={styles.content}
            cols="30"
            rows="3"
            value={nickname}
            placeholder="닉네임을 입력해주세요."
            onChange={handleNicknameChange}
          ></textarea>
        </div>
      </div>
    </>
  );
}
