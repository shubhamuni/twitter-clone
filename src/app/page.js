'use client'
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Component() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState();
  const [userStatusInfo, setuserStatusInfo] = useState(false)
  function getUserInfo() {
    if (status === 'loading') {
      return;
    }
    fetch('/api/users?id=' + session.user.id)
      .then(response => {
        response.json().then(json => {
          console.log(json);
          setUserInfo(json.user)
          setuserStatusInfo(true)
      })
    })
  }
  useEffect(() => {
    getUserInfo();
  }, [status])
  
  if (userStatusInfo === false) {
    return 'Loading user info'
  }
  if (!userInfo?.dfd) {
    return "No username"
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
