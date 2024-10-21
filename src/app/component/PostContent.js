import TimeAgo from "timeago-react";
import Avatar from "./Avatar";

export default function PostContent({ text, author, createdAt }) {
    console.log(author);
    
    return (
        <div className="text-twitterWhite flex">
            <div>
                <Avatar src={author.image}/>
            </div>
            <div className="pl-2">
                <div>
                    <span>{author.name}</span>
                    <span className="pl-1 text-twitterLightGray">{author.username}</span>
                    <span className="pl-1 text-twitterLightGray"><TimeAgo datetime={createdAt}/></span>
                </div>
                <div>
                    {text}
                </div>
            </div>
        </div>
    )
}