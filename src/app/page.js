'use client'
import UsernameForm from "./component/UsernameForm";
import useUserInfo from "../../hooks/useUserInfo";
import PostForm from "./component/PostForm";
import { useState, useEffect } from "react";


export default function Component() {
  const { userInfo, status: userStatusInfo } = useUserInfo();
  const [posts, setPost] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(json => {
        setPost(json); // Set status when authenticated
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        setStatus('error'); // Set status if there's an error
      }
      );
  }, [])

    console.log(posts);
    
  
  
  if (userStatusInfo === false) {
    return 'Loading user info'
  }
  if (!userInfo?.username) {
    return <UsernameForm/>
  }


  return (
    <div className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm />
      <div className="text-twitterWhite pt-10 border-t-4">Text is :{posts[0].text}</div>
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