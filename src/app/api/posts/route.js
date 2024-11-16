import { getServerSession } from "next-auth";
import { initMongoose } from "../../../../lib/mongoose";
import Post from "../../../../modles/Post";
import { authOptions } from "../auth/[...nextauth]/route";
import Like from "../../../../modles/Like";


export async function GET(request) {
  await initMongoose();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const session = await getServerSession({ req: request, ...authOptions });
    const posts = await Post.find()
      .populate('author') // Ensure 'author' refers to the User model
      .sort({ createdAt: -1 }) // Ensure that createdAt is properly set in the Post schema
      .limit(20)
      .exec();

    const postsLikedByMe = Like.find({author:session.user.id,post:posts.map(p => p._id)});
    const idsLikedByMe = (await postsLikedByMe).map(like => like.post);
    if (id) {
      const post = await Post.findById(id)
        .populate('author') // Ensure 'author' refers to the User model
        .exec();
      if (!post) {
        return new Response(JSON.stringify({ error: 'Post not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({post}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!posts || posts.length === 0) {
      return new Response(JSON.stringify({ error: 'No posts found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ posts, idsLikedByMe}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function POST(request) {
    await initMongoose();
    const body = await request.json();
    const { text, parent } = body;

    
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
             author: session.user.id,
             text,
             parent,
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
        
         return new Response(JSON.stringify(createPost), {
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