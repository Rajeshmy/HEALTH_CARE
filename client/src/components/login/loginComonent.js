'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn, setToken, setUserDetails } from '../../store/slices/userSlice';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const performLogin = async (formData) => {

        const { username, password } = formData;

        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: username,
                password
            }),
        });

        const data = await res.json();

        console.log(data, "response of login");

        if (!data.success) throw new Error(data.message || "login failed");

        return data;
    };

    const validate = () => {
        const newErrors = {};
        let valid = true;

        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.username.trim())) {
            newErrors.username = 'Invalid email format.';
            valid = false;
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const loginData = await performLogin(formData);

                const { name, email, role } = loginData?.userDetails || {};
                dispatch(setIsLoggedIn({ isLoggedIn: true }));
                dispatch(setToken({ token: loginData?.token }));
                dispatch(setUserDetails({ userDetails: { name, email, role } }));
                alert("Login successful!");
                router.replace('/dashboard');
            } catch (err) {
                console.error("login failed:", err);
                alert(err);
            }
        }
    };

    return (
        <div className="flex-1 flex-col w-[300px] min-h-[200px] p-4 border rounded-2xl mt-10 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-2">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                    <label htmlFor="username" className="block text-gray-700 text-sm">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-gray-700 text-sm">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        maxLength={20}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white text-sm py-1.5 rounded-md hover:bg-blue-700 transition cursor-pointer"
                >
                    Login
                </button>
            </form>

            <p className="text-center mt-2 text-xs">
                User is <span className="font-semibold">{isLoggedIn ? 'Logged In' : 'Logged Out'}</span>
            </p>

            {/* Register & Forgot Password */}
            <div className="text-sm text-center mt-4 space-y-1">
                <p
                    onClick={() => router.push('/register')}
                    className="text-blue-600 hover:underline cursor-pointer"
                >
                    Register
                </p>
                <p
                    onClick={() => alert('Need to reset password')}
                    className="text-blue-600 hover:underline cursor-pointer"
                >
                    Forgot Password?
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
