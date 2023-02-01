import { configureStore, createSlice } from '@reduxjs/toolkit';

let user = createSlice({
    name: 'user',
    initialState: {
        kakaoNickname: '',
    },
    reducers : {
        login(state, action) {
            // console.log('action.payload : ', action.payload)
            return action.payload
        }
    }
})

export default configureStore({
    reducer: {
        user : user.reducer
    }
})

export let { login } = user.actions