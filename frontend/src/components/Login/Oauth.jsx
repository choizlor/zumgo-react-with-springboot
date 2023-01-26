import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Oauth() {
  
  const code = new URL(window.location.href).searchParams.get('code');
  
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`api/code=${code}`);
        const token = res.headers.authorization;
        window.localStorage.setItem('token', token);
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

