"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";


export default function HeaderControls(){
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();
    function logout(){
        if(window){
            localStorage.removeItem("user-id");
            localStorage.removeItem("roles");
            setUserId(null);
            router.push("/")
        }
    }
    useEffect(() => {
    if(window){
        setUserId(localStorage?.getItem("user-id"));
    }}, []);

    return (
        <>
        {userId ?
        <li>
            <button onClick={logout}>Logout</button>
        </li>
        :
        <>
        <li>
                <Link href="/login" className="">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="">
                  Sign Up
                </Link>
              </li>
              </>
}
        </>
    )
}