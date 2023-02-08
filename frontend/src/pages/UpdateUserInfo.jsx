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

  const content = {
    nickname,
  };

  // 상품등록 axios
  const handleUpdate = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    let files = e.target.imgurl.files;

    if(files.length) {
      formData.append("imgUrl", files[0]);
    } 

    formData.append(
      "content",
      new Blob([JSON.stringify(content)], { type: "application/json" })
    );

    await axios
      .post(`http://i8c110.p.ssafy.io/user/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // navigate(`/detail/${res.data}`)
        console.log(res.data);
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

          <input
            className={styles.file}
            type="file" // 파일로 입력 받음
            accept="image/*" // 이미지 유형의 파일만 받기
            capture="camera" // 모바일에서 직접 카메라가 호출될 수 있도록 하는,,,근데 이제,, 나는 안해본,,
            name="imgurl" // 담긴 파일을 참조할 때 사용할 이름
            multiple // 다중 업로드
          />
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
