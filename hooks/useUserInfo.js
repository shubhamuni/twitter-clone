import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function useUserInfo() {
    const { data: session, status: sessionStatus } = useSession();
    const [userInfo, setUserInfo] = useState(null); // Initialize as null
    const [status, setStatus] = useState('loading'); // 'loading', 'authenticated', or 'error'
    const router = useRouter();

    function getUserInfo() {
        if (sessionStatus === 'loading') {
            return;
        }

        // If no session, redirect to login
        if (!session) {
            router.push('/login');
            return;
        }

        // Fetch user info if session is available
        if (session) {
            fetch(`/api/users?id=${session.user.id}`)
                .then(response => response.json())
                .then(json => {
                    setUserInfo(json);
                    setStatus('authenticated'); // Set status when authenticated
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                    setStatus('error'); // Set status if there's an error
                });
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [sessionStatus]);

    return { userInfo, status };
}
