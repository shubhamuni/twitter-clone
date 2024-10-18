'use client'
import { signOut } from "next-auth/react";
import UsernameForm from "./component/UsernameForm";
import useUserInfo from "../../hooks/useUserInfo";

export default function Component() {
  const {userInfo, status: userStatusInfo} = useUserInfo();
  
  if (userStatusInfo === false) {
    return 'Loading user info'
  }
  if (!userInfo?.dfd) {
    return <UsernameForm/>
  }

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
