import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useUserInfo() {
    const { data: session, status:sessionStatus } = useSession();
    const [userInfo, setUserInfo] = useState();
    const [status, setStatus] = useState(false)
    
    function getUserInfo() {
        if (sessionStatus === 'loading') {
            return;
        }
    fetch('/api/users?id=' + session.user.id)
      .then(response => {
        response.json().then(json => {
          console.log(json);
          setUserInfo(json)
          setStatus(true)
      })
    })
    }
    useEffect(() => {
    getUserInfo();
    }, [sessionStatus])
    
    return{userInfo, status}
}