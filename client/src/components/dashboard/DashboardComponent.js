'use client'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const DashboardComponent = () => {

    const { userDetails, token } = useSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (!token) router.push("/login")
    }, [token])


    return (
        <div className="p-4 text-xl font-semibold">
            <h2>
                Welcome ---{userDetails?.name || "User"}---, your role is ---{userDetails?.role || "N/A"}---
            </h2>
            <p>
                Your login token for API calls:-
            </p>
            <p className="max-w-[80%] mx-2 bg-gray-100 p-2 flex-wrap flex-1 break-words">{token || "No token found"}</p>
        </div>
    )
}

export default DashboardComponent