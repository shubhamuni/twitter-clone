import { getServerSession } from "next-auth";
import { initMongoose } from "../../../../lib/mongoose";
import Post from "../../../../modles/Post";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
    await initMongoose();
    const body = await request.json();
    const { text } = body;

    
     try {
        // Get the session using the request and auth options
        const session = await getServerSession({ req: request, ...authOptions });

        // Check if the session exists
         if (!session) {
             return new Response(JSON.stringify({ error: "No session found" }), {
                 status: 401,
                 headers: {
                     'Content-Type': 'application/json',
                 },
             });
         }

        // // Find the user by the session user ID and update their username
         const createPost = await Post.create({
             auher: session.user.id,
             text
         })

        // // Check if the user was found and updated
         if (!createPost) {
             return new Response(JSON.stringify({ error: 'User not found' }), {
                 status: 404,
                 headers: {
                     'Content-Type': 'application/json',
                 },
             });
         }

        // Return the updated user data as a response
        
         return new Response(JSON.stringify({createPost}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error processing PUT request:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}