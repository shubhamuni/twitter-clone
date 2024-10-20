'use client'
import { signOut } from "next-auth/react";
import UsernameForm from "./component/UsernameForm";
import useUserInfo from "../../hooks/useUserInfo";
import Image from 'next/image'; // Import the Next.js Image component


export default function Component() {
  const {userInfo, status: userStatusInfo} = useUserInfo();
  
  if (userStatusInfo === false) {
    return 'Loading user info'
  }
  if (!userInfo?.username) {
    return <UsernameForm/>
  }


  return (
    <div className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
      <form className="mx-5">
        <div className="flex">
          <div className="rounded-full overflow-hidden w-12 h-12">
            <Image 
              src={userInfo?.image || '/google.png'} 
              alt="avatar"
              width={48}  // Avatar size (48x48 pixels)
              height={48} 
              className="object-cover"
            />
          </div>

          {/* Post input area */}
          <div className="grow pl-4">
            <textarea 
              className="w-full resize-none border-none focus:ring-0 text-lg" 
              placeholder="What's happening?"
              rows="3"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
{/* <div className="flex items-center justify-center h-screen">
      <span>Signed in as {userInfo.username}</span>
      {/* No need to pass 'google' to signOut */}
      // <button
      //   className='bg-twitterWhite pl-2 w-20 m-10 text-black rounded-full flex items-center h-14'
      //   onClick={() => signOut('google')}>
      //   Sign out
      // </button>
    // </div> */}