'use client';

import { useRouter } from 'next/navigation'; // Use the correct router import for Next.js 13+
import { useEffect } from 'react';
import LoginButton from './button';
import { useSession, signOut } from "next-auth/react";

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Use useEffect to handle redirects
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]); // Run when session or router changes
  
  if (status === 'loading') {
    return <div>Loading...</div>; // Better handling for loading state
  }
  
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
