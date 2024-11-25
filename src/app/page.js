'use client'
import UsernameForm from "./component/UsernameForm";
import useUserInfo from "../../hooks/useUserInfo";
import PostForm from "./component/PostForm";
import { useState, useEffect } from "react";
import PostContent from "./component/PostContent";
import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en';
import en from 'javascript-time-ago/locale/en.json';
import Layout from "./component/Layout";
import { signOut } from "next-auth/react";

TimeAgo.addDefaultLocale(en);


export default function Component() {
  const { userInfo, setUserInfo, status: userStatusInfo } = useUserInfo();
  const [posts, setPost] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);

  async function logout() {
    setUserInfo(null);
    await signOut();
}

  const fetchPost = () => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(json => {
        setPost(json.posts);
        setIdsLikedByMe(json.idsLikedByMe)// Set status when authenticated
        console.log(json.posts);
        
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
    <Layout>
      <h1 className="text-lg font-bold p-2  mt-1">Home</h1>
      <PostForm onPost={fetchPost}/>
      <div className="text-twitterWhite">{posts.length > 0 && posts.map((post, index) => (
        <div className="text-twitterWhite border-t border-twitterBorder p-5" key={index}>
          <PostContent {...post} likedByMe={idsLikedByMe.includes(post._id)} />
        </div>
      ))}</div>
      {userInfo && <div className="text-center border-t border-twitterBorder p-5">
        <button onClick={logout} className="bg-twitterWhite text-twitterDarkGray px-5 py-2 rounded-full">
          Logout
        </button>
      </div>}
    </Layout>
  )
};