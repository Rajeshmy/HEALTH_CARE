'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Home = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const router = useRouter();

  useEffect(() => {

    if (isLoggedIn) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  return null;
}

export default Home
