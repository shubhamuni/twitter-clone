import Image from 'next/image'; // Import the Next.js Image component
import useUserInfo from '../../../hooks/useUserInfo';

export default function PostForm() {
    const { userInfo, status } = useUserInfo();

    if (status === 'loading') {
        return "";
    }
    return (
    <form className="mx-5">
        <div className="flex">
          <div className="rounded-full overflow-hidden w-12 h-12">
            <Image 
              src={userInfo?.image || '/google.png'} 
              alt="avatar"
              width={48}  // Avatar size (48x48 pixels)
              height={48} 
              className="object-cover"
            />
          </div>

          {/* Post input area */}
          <div className="grow pl-4">
            <textarea 
              className="w-full resize-none border-none focus:ring-0 text-lg bg-transparent text-twitterWhite" 
              placeholder="What's happening?"
              rows="3"
            />
          </div>
        </div>
        <div className="text-right mt-2">
          <button 
            type="submit" 
            className="bg-twitterBlue text-white rounded-full px-4 py-2 font-bold hover:bg-twitterDarkBlue"
          >
            Tweet
          </button>
        </div>
      </form>  
  )
}
