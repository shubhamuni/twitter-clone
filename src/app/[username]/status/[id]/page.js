"use client"; // This marks the component as a client component

import Layout from "@/app/component/Layout";
import PostContent from "@/app/component/PostContent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { use } from 'react'; // Import `use` hook

export default function Page({ params }) {
    const [post, setPost] = useState('');

    // Await the params Promise using `use()`
    const { id } = params;

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
        <Layout>
            {post && (
                <div className="px-5 py-2">
                    
                    <Link href={'/'}>
                        <div className="flex mb-5 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Tweet
                        </div>
                    </Link>
                    <PostContent {...post} big={true} />
                </div>
            )}
        </Layout>
    );
}
