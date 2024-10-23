import { getServerSession } from "next-auth";
import { initMongoose } from "../../../../lib/mongoose";


export async function POST(request) {
    await initMongoose();
    const session = await getServerSession({ req: request, ...authOptions });
    const body = await request.json();
    const postId = body.id;
    const UserId = session.user.id;

    try {
        return new Response(JSON.stringify({id}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}