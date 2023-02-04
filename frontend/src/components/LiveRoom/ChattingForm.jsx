import React, { useState } from "react";

const ChattingForm = (props) => {
  const [message, setMessage] = useState("");

  // 메세지를 보내는 함수
  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      props.onMessage(
        `${props.myUserName}: ` + message.trim(),
        props.currentSession
      ); // 공백을 제거하여 전달
    }
    setMessage("");
  };

  // 입력 데이터 변경
  const inputChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        placeholder="메세지를 입력하세요"
        id="chat-input"
        value={message}
        onChange={inputChangeHandler}
        style={{
          width: "100%",
          background: "rgba(255, 255, 255)",
          border: "1px solid rgba(177, 177, 177)",
          borderRadius: "5px",
          padding: "5px",
        }}
      ></input>
      <button
        style={{ color: "white", background: "black" }}
        onClick={sendMessage}
      >send</button>
    </form>
  );
};

export default ChattingForm;
