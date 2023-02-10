import React from "react";

export default function BuyerLoading({ joinSession }) {
  return (
    <div
      onClick={() => {
        joinSession;
      }}
    >
      라이브 입장하기
    </div>
  );
}
