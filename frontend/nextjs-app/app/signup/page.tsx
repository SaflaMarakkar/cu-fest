"use client";
import { useState } from "react";

export default function Signup() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: ""
  });
  const handleSignup = async () => {
    if (!state.firstName || !state.lastName || !state.email) {
      alert("First Name, Last Name, and Email are required");
      return;
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    }).then(res => res.json()).catch((error) => {
      console.log(error);
    });
    console.log(response);
    if (response) {
      localStorage.setItem("user-id", response?.data?._id);
      localStorage.setItem("roles", response?.data?.roles);
      localStorage.setItem("username", response?.data?.firstName);
      window.location.href = "/profile";
    }
  }
  return <div className="mt-6  min-h-[50vh] flex flex-col justify-center items-center"><div className="mt-6 rounded-2xl min-w-[100vh] min-h-[50vh] flex flex-col justify-center backdrop-blur-lg border bg-transparent-50">
    <div className="px-12 py-12 flex flex-col gap-3 h-full">
      <h3 className="text-2xl font-semibold">Signup</h3>
      <span className="font-thin"> Fist Name </span>
      <input type="text" placeholder="First Name" className='border border-gray-100 rounded-lg text-black p-2' name="firstName" onChange={(e) => setState({ ...state, firstName: e.target.value })} required/>
      <span className="font-thin"> Last Name </span>
      <input type="text" placeholder="Last Name" className='border border-gray-100 rounded-lg text-black p-2' name="lastName" onChange={(e) => setState({ ...state, lastName: e.target.value })} required />
      <span className="font-thin"> Email </span>
      <input type="text" placeholder="Email" className='border border-gray-100 rounded-lg text-black p-2' name="email" onChange={(e) => setState({ ...state, email: e.target.value })} required />
      <span className="font-thin"> Phone Number </span>
      <input type="text" placeholder="Phone Number" className='border border-gray-100 rounded-lg text-black p-2' name="phoneNumber" onChange={(e) => setState({ ...state, phoneNumber: e.target.value })} />
      <span className="font-thin"> Password </span>
      <input type="password" placeholder="Password" className='border border-gray-100 rounded-lg text-black p-2' name="password" onChange={(e) => setState({ ...state, password: e.target.value })} required/>
      <button type="submit" className="mt-4 bg-black hover:bg-red-500 focus:bg-cyan-500 py-3 px-6 text-white transition-colors duration-200 outline rounded" onClick={handleSignup}>Signup</button>
    </div>
  </div>
  </div>;
}