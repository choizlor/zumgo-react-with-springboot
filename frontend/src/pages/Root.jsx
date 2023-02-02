import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/userSlice.js'

export default function Root() {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        //state는 기존 값
        const token = window.localStorage.getItem('token')
        try {
            const res = axios.get('http://localhost:8080/api/me', {
                headers: {
                    Authorization: token,
                }
            }
            );
            res.then((user) => {
                console.log('로그인된 유저 : ', user.data.user)
                dispatch(login({
                    userCode: user.data.user.userCode,
                    kakaoId : user.data.user.kakaoId,
                    kakaoNickname: user.data.user.kakaoNickname,
                }))

                setUserInfo(user.data.user)

            })
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div>
            {/* {JSON.stringify(userInfo)} */}
            <Outlet userInfo={userInfo}/>
        </div>
    );
}

