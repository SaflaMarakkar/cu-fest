"use client";
import { useState } from "react";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: ""
  })
  const handleLogin = async () => {
    if(!state.email || !state.password) {
      alert("Email and Password are required");
      return;
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + state.email + "/" + state.password).then(res => res.json()).catch((error) => {
      console.log(error);
    });
    if (response) {
      localStorage.setItem("roles", response?.roles);
      localStorage.setItem("user-id", response?._id);
      window.location.href = `/profile`;
    }
  }
  return <div className="mt-6  min-h-[50vh] flex flex-col justify-center items-center"><div className="mt-6 rounded-2xl min-w-[100vh] min-h-[50vh] flex flex-col justify-center backdrop-blur-lg border bg-transparent-50">
    <div className="px-12 py-12 flex flex-col gap-3 h-full">
      <h3 className="text-2xl font-semibold">Login</h3>
      <span className="font-thin"> Email </span>
      <input type="text" placeholder="Email" className='border border-gray-100 rounded-lg text-black p-2' name="email" onChange={(e) => setState({ ...state, email: e.target.value })} />
      <span className="font-thin"> Password </span>
      <input type="password" placeholder="Password" className='border border-gray-100 rounded-lg text-black p-2' name="password" onChange={(e) => setState({ ...state, password: e.target.value })} />
      <button className="mt-4 bg-black hover:bg-red-500 focus:bg-cyan-500 py-3 px-6 text-white transition-colors duration-200 outline rounded" onClick={handleLogin}>Login</button>
    </div>
    </div>
  </div>;
}