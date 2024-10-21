'use client'
import UsernameForm from "./component/UsernameForm";
import useUserInfo from "../../hooks/useUserInfo";
import PostForm from "./component/PostForm";
import { useState, useEffect } from "react";
import PostContent from "./component/PostContent";


export default function Component() {
  const { userInfo, status: userStatusInfo } = useUserInfo();
  const [posts, setPost] = useState([]);

  const fetchPost = () => {
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
  }
  useEffect(() => {
    fetchPost();
  }, [])
  
  
  
  if (userStatusInfo === false) {
    return 'Loading user info'
  }
  if (!userInfo?.username) {
    return <UsernameForm/>
  }


  return (
    <div className="max-w-lg mx-auto border-l border-r border-twitterBorder min-h-screen">
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm onPost={fetchPost}/>
      <div className="text-twitterWhite">{posts.length > 0 && posts.map((post, index) => (
        <div className="text-twitterWhite border-t border-twitterBorder p-5" key={index}>
          <PostContent {...post} />
        </div>
      ))}</div>
    </div>
  )
};