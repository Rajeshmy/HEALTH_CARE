'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn } from '../../store/slices/userSlice';
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

    const validate = () => {
        const newErrors = {};
        let valid = true;

        if (!/^[a-zA-Z0-9]{4,}$/.test(formData.username)) {
            newErrors.username = 'Username must be at least 4 characters and alphanumeric only.';
            valid = false;
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('✅ Validation Passed. Ready to proceed to API call');
            dispatch(setIsLoggedIn({ isLoggedIn: true }));
            router.push('/dashboard');
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
                        placeholder="Enter your username"
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
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white text-sm py-1.5 rounded-md hover:bg-blue-700 transition"
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
