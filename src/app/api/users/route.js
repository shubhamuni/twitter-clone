// app/api/users/route.js
import { initMongoose } from '../../../../lib/mongoose'; // Adjust path as necessary
import User from '../../../../modles/Users';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request) {
    await initMongoose();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); // Extract the id from the query parameters

    try {
        const user = await User.findById(id); // Await the result of findById
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function PUT(request) {
    await initMongoose();
    // try {
        // Get the session using the request and auth options
    // const session = await getServerSession({ req: request, ...authOptions });
    const session = await getServerSession(authOptions)
    if (session) {
        return(JSON.stringify(session))
    }
        // Check if the session exists
        if (!session) {
            return new Response(JSON.stringify({ error: "No session found" }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Optionally, you can perform any additional operations with the session here

        // Return the session data as a response
        return new Response(JSON.stringify(request), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    // } catch (error) {
    //     console.error('Error processing PUT request:', error);
    //     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
    //         status: 500,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    // }
}