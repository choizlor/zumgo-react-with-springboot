import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useSelector , useDispatch} from 'react-redux';
import { getUserInfo } from '../store/store.js';


export default function Root() {
    let { user } = useSelector((state) => { return state.user })
    let dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({});
    
    // redux 
    useEffect(() => {
       //state는 기존 값
       const token = window.localStorage.getItem('token')
       try {
           const res = axios.get('api/me',{
               headers: {
                   Authorization: token,
               }}
           );
           res.then((user) => {
            setUserInfo(user.data)
        })
       } catch (err) {
           console.log(err)
       }
    }, [])

    return (
        <div>
            {JSON.stringify(userInfo)}
            <Outlet />
        </div>
    );
}

