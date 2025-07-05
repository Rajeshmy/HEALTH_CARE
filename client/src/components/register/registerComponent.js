'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {

    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isDoctor: false,
        specialization: '',
        license: ''
    });

    const [errors, setErrors] = useState({});
    const [registered, setRegistered] = useState(false);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const validate = () => {
        const newErrors = {};
        let valid = true;

        if (formData.name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters.';
            valid = false;
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address.';
            valid = false;
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
            valid = false;
        }

        if (formData.isDoctor) {
            if (formData.specialization.trim().length < 3) {
                newErrors.specialization = 'Specialization is required.';
                valid = false;
            }
            if (formData.license.trim().length < 5) {
                newErrors.license = 'License number must be at least 5 characters.';
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const registerUser = async (formData) => {
        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await res.json()
        console.log(data, "response of register user")
        if (!data.success) throw new Error("User registration failed");
        return data;
    };

    const registerDoctor = async (userId, formData) => {
        const res = await fetch("http://localhost:5000/api/auth/registerDoctor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId,
                specialization: formData.specialization,
                licenseNumber: formData.license
            }),
        });
        const data = await res.json()
        console.log(data, "response of register doctor")
        if (!data.success) throw new Error("Doctor registration failed");
        return data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (registered) return router.replace("/login");

        if (validate()) {
            try {
                console.log("✅ Registering user:", formData);
                const userRes = await registerUser(formData);

                if (formData?.isDoctor) {
                    const doctorRes = await registerDoctor(formData.email, formData);
                    console.log("✅ Doctor details saved:", doctorRes);
                }

                setRegistered(true);
                alert("Registration successful!");
            } catch (err) {
                console.error("❌ Registration error:", err);
                alert(err.message || "Registration failed");
            }
        }
    };



    return (
        <div className="w-[350px] mx-auto mt-10 p-6 border rounded-2xl shadow bg-white">
            <h2 className="text-xl font-semibold text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:ring focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:ring focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:ring focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Checkbox: Doctor */}
                <div className="flex items-center space-x-2">
                    <input
                        id="isDoctor"
                        type="checkbox"
                        checked={formData.isDoctor}
                        onChange={handleChange}
                        className="accent-blue-600"
                    />
                    <label htmlFor="isDoctor" className="text-sm text-gray-700">I am a Doctor</label>
                </div>

                {/* Doctor-specific fields */}
                {formData.isDoctor && (
                    <>
                        {/* Specialization */}
                        <div>
                            <label htmlFor="specialization" className="block text-sm text-gray-700">Specialization</label>
                            <input
                                id="specialization"
                                type="text"
                                value={formData.specialization}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md text-sm focus:ring focus:ring-blue-500"
                            />
                            {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
                        </div>

                        {/* License */}
                        <div>
                            <label htmlFor="license" className="block text-sm text-gray-700">License No.</label>
                            <input
                                id="license"
                                type="text"
                                value={formData.license}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md text-sm focus:ring focus:ring-blue-500"
                            />
                            {errors.license && <p className="text-red-500 text-xs mt-1">{errors.license}</p>}
                        </div>
                    </>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm transition"
                >
                    {!registered ? "Register" : "Go to login"}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
