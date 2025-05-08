"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderControls() {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [roles, setRoles] = useState<string | null>(null);
  const router = useRouter();
  function logout() {
    if (window) {
      localStorage.removeItem("user-id");
      localStorage.removeItem("roles");
      localStorage.removeItem("username");
      setUserId(null);
      router.push("/");
    }
  }
  useEffect(() => {
    if (window) {
      setUserId(localStorage?.getItem("user-id"));
      setUsername(localStorage?.getItem("username"));
      setRoles(localStorage?.getItem("roles"));
    }
  }, []);

  return (
    <>
    {roles && roles?.toLocaleLowerCase() === "admin" && (
      <>
        <li>
          <Link href="/programs/add" className="">
            Add Program
          </Link>
        </li>
        <li>
        <Link href="/user_list" className="">
          User List
        </Link>
      </li>
      </>
      )}
      {userId ? (
        <>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
          <li>
            <Link href="/profile">
              <div className="rounded-full flex gap-2 items-center bg-black hover:bg-red-500 focus:bg-cyan-500 p-2 sm:py-3 sm:px-6 text-white transition-colors duration-200 border">
                {username?.[0]}
              </div>
            </Link>
          </li>
        </>
      ) : (
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
      )}
    </>
  );
}
