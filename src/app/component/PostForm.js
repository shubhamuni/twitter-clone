import Image from 'next/image'; // Import the Next.js Image component
import useUserInfo from '../../../hooks/useUserInfo';
import { useState } from 'react';
import Avatar from './Avatar';

export default function PostForm({ onPost, compact, placeholder='What\'s happening' }) {
    const { userInfo, status } = useUserInfo();
    const [text, setText] = useState('');

    if (status === 'loading') {
        return "";
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission reload

        try {
            // Make the POST request to create a new post
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ text }), // Send the 'text' in the request body
            });

            if (response.ok) {
                const data = await response.json(); // Parse response JSON
                console.log('Post created successfully:', data);
                // Optionally update UI or clear the form
                setText(''); // Clear the input field after successful post
                
                // Call onPost if it's defined and post is successful
                if (onPost) {
                    onPost();
                }
            } else if (response.status === 401) {
                console.error('Unauthorized: Please log in first');
                // Optionally redirect to login page or show a message
            } else if (response.status === 400) {
                console.error('Bad Request: Check if you provided all the required fields');
            } else {
                console.error('Failed to create post:', response.statusText);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <form className="mx-5" onSubmit={handlePostSubmit}>
            <div className={(compact ? 'items-center' : "") + " flex"}>
                <div>
                    <Avatar src={userInfo?.image}/>
                </div>
                {/* Post input area */}
                <div className="grow pl-4">
                    <textarea 
                        className={(compact ? 'h-10 pt-1' : 'h-24')+" w-full resize-none border-none focus:ring-0 text-lg bg-transparent text-twitterWhite"} 
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder={placeholder}
                        rows="3"
                    />
                    {!compact && (
                    <div className="text-right border-t  border-twitterBorder pt-2 pb-2">
                        <button 
                            type="submit" 
                            className=" bg-twitterBlue text-white rounded-full px-4 py-2 font-bold hover:bg-twitterDarkBlue">
                            Post
                        </button>
                    </div>
                    )}
                </div>
                {compact && (
                    <div className='pl-2'>
                        <button 
                            type="submit" 
                            className=" bg-twitterBlue text-white rounded-full px-4 py-2 font-bold hover:bg-twitterDarkBlue">
                            Reply
                        </button>
                    </div>
                )}
            </div>
        </form>  
    );
}
