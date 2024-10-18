'use client'
import React from 'react'
import { signIn } from "next-auth/react";
import Image from 'next/image'; // Import the Next.js Image component

const LoginButton = () => {
  return (
    <button className='bg-twitterWhite py-2 pl-2 pr-6 text-black rounded-full flex items-center h-14' onClick={() => signIn("google")}>
      <Image
        src="/google.png" // Path relative to the public folder
        alt="Google Logo"
        width={20} // Specify width and height (required for next/image)
        height={10}
        className='mx-2'
      />
      Sign in with Google
    </button>
  )
}

export default LoginButton;
