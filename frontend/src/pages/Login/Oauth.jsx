import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Oauth() {

  // params로 받은 인가 코드를 code 변수에 저장
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code, '🎄')

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // 토큰 axios 요청
        const res = await axios.get(`api/oauth/token?code=${code}`)
        const token = res.headers.authorization;
        console.log('oauth 통과했음')

        // 받아온 토큰을 로컬 스토리지에 token으로 저장
        window.localStorage.setItem('token', token);
        
        

        // home으로 이동
        navigate('/');
      } catch (e) {
        console.error(e);
        navigate('/');
      }
    })();
  }, []);

  return (
    <div>
    </div>
  );
}

