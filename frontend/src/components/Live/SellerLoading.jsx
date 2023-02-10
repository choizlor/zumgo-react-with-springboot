import axios from "axios";
import React from "react";

export default function SellerLoading({ joinSession, roomId }) {
  const token = window.localStorage.getItem("token");

  const onairSession = () => {
    const body = JSON.stringify({
      productId: roomId,
      liveStartTime: new Date(),
      liveStatus: "ONAIR",
    });

    axios
      .patch(`https://i8c110.p.ssafy.io/api/v1/live/${roomId}`, body, {
        headers: {
          Authorization: token,
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
          joinSession;
          onairSession;
        }}
      >
        라이브 시작하기
      </div>
    </div>
  );
}
