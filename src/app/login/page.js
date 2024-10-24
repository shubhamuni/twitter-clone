'use client';

import { useRouter } from 'next/navigation';  
import { useEffect } from 'react';
import LoginButton from './button';
import { useSession } from "next-auth/react";
import LoadingIcons from 'react-loading-icons';

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Use useEffect to handle redirects
  useEffect(() => {
    if (session) {
      router.push('/');
    }
    if (!session) {
      router.push('/login')
    }
  }, [session, router, status]); // Run when session or router changes
  
  console.log(status);
  
  if (status === 'loading') {
    return <div className='flex items-center justify-center h-screen'>
      <LoadingIcons.Circles />
    </div> ; // Better handling for loading state
  } else if (status === 'unauthenticated') {
    return (
    <div>
        <div className="flex items-center justify-center h-screen">
          <div>
            <LoginButton />
          </div>
        </div>
    </div>
  );
  }
  return null
}
