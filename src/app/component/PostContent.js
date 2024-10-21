import React from 'react';
import Avatar from "./Avatar"; // Ensure this component is set up correctly
import ReactTimeAgo from 'react-time-ago';
import Link from 'next/link';

export default function PostContent({ text, author, createdAt, _id }) {
    console.log(author);

    return (
        <div className="text-twitterWhite flex">
            <div>
                <Avatar src={author.image} />
            </div>
            <div className="pl-2">
                <div>
                    <span className='font-bold'>{author.name}</span>
                    <span className="pl-1 text-twitterLightGray">@{author.username}</span>
                    {createdAt && (
                        <span className="pl-1 text-twitterLightGray">
                            <ReactTimeAgo date={createdAt} timeStyle="twitter" locale="en-US" />
                        </span>
                    )}
                </div>
                <Link href={`/${author.username}/status/${_id}`}>
                    {text}
                </Link>
            </div>
        </div>
    );
}
