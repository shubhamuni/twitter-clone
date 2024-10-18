'use client'
import { useSession, signOut } from "next-auth/react";

export default function Component() {
    const { session, status } = useSession();

  return (
    <div className="flex items-center justify-center h-screen">
      <span>Signed in as </span>
      {/* No need to pass 'google' to signOut */}
      <button
        className='bg-twitterWhite pl-2 w-20 m-10 text-black rounded-full flex items-center h-14'
        onClick={() => signOut('google')}>
        Sign out
      </button>
    </div>
  )
}
