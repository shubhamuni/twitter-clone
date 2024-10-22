"use client"; // This marks the component as a client component

import PostContent from "@/app/component/PostContent";
import { useEffect, useState } from "react";
import { use } from 'react'; // Import `use` hook

export default function Page({ params }) {
    const [post, setPost] = useState('');

    // Await the params Promise using `use()`
    const { id } = use(params);

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/posts?id=${id}`);
            const json = await response.json();
            setPost(json.post);
            console.log(json.post); // For debugging
        } catch (error) {
            console.error('Error fetching post:', error); // Error handling
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]); // Add id as a dependency

    return (
        <div>
            {post && (
                <PostContent {...post} />
            )}
        </div>
    );
}
