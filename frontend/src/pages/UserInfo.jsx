import React from 'react';

export default function UserInfo() {

    const REST_API_KEY = 'b875d5c09e310962a4402f90c93aa19c';

    const LOGOUT_REDIRECT_URI = "http://localhost:3000"; 
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;

    const handleLogout = () => {
        window.localStorage.removeItem('token')
    }
    return (
        <div>
            회원 정보 페이지
            <span onClick={handleLogout}>
                <a href={KAKAO_AUTH_URI}>
                로그아웃
                </a>
            </span>
        </div>
    );
}

