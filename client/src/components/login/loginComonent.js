'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn } from '../../store/slices/userSlice';

const LoginForm = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const handleLogin = () => {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
    };

    return (
        <div>
            <p>User is {isLoggedIn ? "Logged In" : "Logged Out"}</p>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
