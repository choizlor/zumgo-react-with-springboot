import React, { useEffect,useState } from 'react';
import styles from './styles/UserInfo.module.css';
import UserInfoDetail from '../components/UserInfo/UserInfoDetail';
import BottomNav from '../components/Nav/BottomNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UserInfo() {
    const [userInfo, setUserInfo] = useState({});

    // 마이 페이지 인지 확인하기
    const [isMe, setIsMe] = useState(false);
    const store = useSelector((state) => { return state.user })
    console.log(store)

    // 로그아웃
    const REST_API_KEY = 'b875d5c09e310962a4402f90c93aa19c';
    const LOGOUT_REDIRECT_URI = "http://localhost:3000"; 
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;

    const handleLogout = () => {
        window.localStorage.removeItem('token')
    }

    // 사용자 정보를 불러오는 api
    // const param = useParams();
    // const userId = param.userId;
    // useEffect(() => {
    //     axios.get(`http://localhost:8080/user/${userId}`)
    //     .then((res) => {
    //         console.log('현재 페이지의 유저 : ', res.data)
    //         setUserInfo(res.data)
    //     })
    // })

    
    return (
        <div>
            <span onClick={handleLogout}>
                <a href={KAKAO_AUTH_URI} className={styles.logout}>
                로그아웃
                </a>
            </span>
            <UserInfoDetail/>
            <BottomNav/>
        </div>
    );
}

