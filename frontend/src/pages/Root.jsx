import React from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

export default function Root() {

    const token = window.localStorage.getItem('token');

    try {
        const res = axios.post('api/me', data, {
            headers: {
                Authorization: token,
            },
        });
    } catch (err) {
        console.log(err)
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

