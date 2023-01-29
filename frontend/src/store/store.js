import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 1. 데이터 만들기
let user = createSlice({
    name: 'user',
    initialState : {},
    // 변경하는 함수 만들어주기
    reducers : {
        getUserInfo(state) {
            //state는 기존 값
            const token = window.localStorage.getItem('token')
            let userInfo = {};
            try {
                const res = axios.get('api/me',{
                    headers: {
                        Authorization: token,
                    }}
                );
                res.then((user) => {
                    userInfo = user.data;
                })
            } catch (err) {
                console.log(err)
            }

            return userInfo
        }
    }
})

export default configureStore({
    reducer: {
        // 2. 등록하기
        user: user.reducer
    }
})

export let { getUserInfo } = user.actions