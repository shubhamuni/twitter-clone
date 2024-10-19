import { useEffect, useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";

export default function UsernameForm() {
    // Fetch user information from custom hook
    const { userInfo, status } = useUserInfo();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false); // To manage loading state during fetch

    useEffect(() => {
        console.log(userInfo);

        // Check if status is still loading, return early if true
        if (status === 'loading') {
            return;
        }

        // Ensure userInfo and userInfo.email are defined before accessing email
        if (username === '' && userInfo?.email) {
            const defaultUsername = userInfo.email.split('@')[0]; // Get the part of the email before '@'
            setUsername(defaultUsername.replace(/[^a-z]+/gi,'')); // Set the default username based on the email
        }
    }, [status, userInfo, username]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User updated successfully:', data);
                // Optionally update the UI or redirect user
            } else {
                console.error('Failed to update user:', response.statusText);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') {
        return ''; // Show nothing while loading
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <form className="text-center" onSubmit={handleFormSubmit}>
                <h1 className="text-xl">Pick a username</h1>
                <input 
                    type="text" 
                    placeholder="username" 
                    className="block mb-1 bg-twitterBorder px-3 py-1 rounded-full"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <button 
                    type="submit" 
                    className="block bg-twitterBlue w-full rounded-full py-1"
                    disabled={loading} // Disable button during loading
                >
                    {loading ? 'Submitting...' : 'Continue'}
                </button>
            </form>
        </div>
    );
}
