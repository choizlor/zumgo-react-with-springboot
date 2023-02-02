import * as StompJs from '@stomp/stompjs';
import {useState} from "react";

function Chat() {
  const [id, changeId] = useState("");
  const onChangeId = (event) => changeId(event.target.value);
  const [message, changeMessage] = useState("");
  const onChangeMessage = (event) => changeMessage(event.target.value);

  let [client, changeClient] = useState(null);
  let [subscription, changeSubscription] = useState(null);


  const connect = () => {    // 연결
    if (id === '') {
      return;
    }
    try {
      const clientdata = new StompJs.Client({
        brokerURL: 'ws://localhost:8080/chat',
        connectHeaders: {
          login: id,
          passcode: 'password',
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      let subscriptiondata = null;
      clientdata.onConnect = function () {
        subscriptiondata = clientdata.subscribe('/sub/channels/1', callback);
        changeSubscription(subscriptiondata);
      };

      const res = clientdata.activate();
      console.log(res);
      changeClient(clientdata);
    } catch (error) {
      console.log(error);
    }
  };

  const disConnect = () => {
    if (client === null) {
      return;
    }

    client.deactivate();
  }

  const send = () => {
    if (message === "") {
      return;
    }

    client.publish({
      destination: "/pub/chat/1",
      body: JSON.stringify({
        type: '',
        sender: id,
        channelId: '1',
        data: message
      }),
      headers: {priority: 9}
    });
  }

  const callback = function (message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
      alert(message.body)
    } else {
      alert("got empty message");
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <input type="text" placeholder="아이디" value={id} onChange={onChangeId}/>
      <button onClick={connect}>접속</button>
      <button onClick={disConnect}>접속 해제</button>
      <br/>
      <input type="text" placeholder="메시지 보내기" value={message} onChange={onChangeMessage}/>
      <button onClick={send}>메시지 전송</button>
    </div>
  );
}

export default Chat;