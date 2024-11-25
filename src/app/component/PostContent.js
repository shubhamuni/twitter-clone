import React from 'react';
import Avatar from "./Avatar"; // Ensure this component is set up correctly
import ReactTimeAgo from 'react-time-ago';
import Link from 'next/link';
import PostButtons from './PostButtons';

export default function PostContent({ text, author, createdAt, _id, likesCount, big=false, likedByMe }) {

    console.log(big);
    console.log(likedByMe)
    
    const createdAtdate = new Date(createdAt)
    return (
        <div>
            <div className="text-twitterWhite flex w-full">
                <div>
                    <Avatar src={author.image} />
                </div>
                <div className="pl-2 grow">
                    <div>
                        <span className='font-bold pr-1'>{author.name}</span>
                        {big && <br/>}
                        <span className="text-twitterLightGray">@{author.username}</span>
                        {createdAt && !big && (
                            <span className="pl-1 text-twitterLightGray">
                                <ReactTimeAgo date={createdAt} timeStyle="twitter" locale="en-US" />
                            </span>
                        )}
                    </div>
                    {!big && (
                    <div>
                        <Link href={`/${author.username}/status/${_id}`}>
                                <div className="w-full cursor-pointer ">
                                    {text}
                        </div>
                            </Link>
                            <PostButtons id={_id} likesCount={likesCount} likedByMe={likedByMe}/>
                    </div>
                    )}
                </div>
            </div>
            {big && (
            <div className='mt-2'>
                <Link href={`/${author.username}/status/${_id}`}>
                        {text}
                </Link>
                    <div className='text-twitterLightGray text-sm'>
                        {createdAtdate.toISOString().replace('T',' ').slice(0,16).split(' ').reverse().join(' ')}
                </div>    
            <PostButtons id={_id} likesCount={likesCount} likedByMe={likedByMe}/>
            </div>
            )}
        </div>
    );
}
