import { getServerSession } from "next-auth";
import { initMongoose } from "../../../../lib/mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import Like from "../../../../modles/Like"
import Post from "../../../../modles/Post";


async function updateLikesCount(postId) {
    const post = await Post.findById(postId);
    post.likesCount = await Like.countDocuments({post: postId})
    await post.save();
}

export async function POST(request) {
    await initMongoose();
    const session = await getServerSession({ req: request, ...authOptions });
    const body = await request.json();
    const postId = body.id;
    const UserId = session.user.id;
    try {
        const existingLike = await Like.findOne({ author: UserId, post: postId })
        if (existingLike) {
            await existingLike.remove();
            await updateLikesCount(postId);
            return new Response(JSON.stringify(null), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            const like = await Like.create({ author: UserId, post: postId })
            updateLikesCount(postId);
            return new Response(JSON.stringify({like}), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}