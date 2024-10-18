import { useEffect, useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";

export default function UsernameForm() {
    const { userInfo, status } = useUserInfo(); // Fetch user information from custom hook
    const [username, setUsername] = useState('');

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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
    }

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
                <button className="block bg-twitterBlue w-full rounded-full py-1">
                    Continue
                </button>
            </form>
        </div>
    );
}
