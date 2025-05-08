"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNewProgram(){
  const router = useRouter();
  const [programData, setProgramData] = useState({
    name: "",
    description: "",
  });

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setProgramData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  async function handleFormSubmit() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/programs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(programData),
    })
      .then((response) => response.json());
      if(res) {
        router.push("/program_list");
      }
  }
  return (
    <main className="p-6 max-w-3xl mx-auto flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-white mb-6">Add New Program</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={programData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={programData.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">
          Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">
          End Date:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          <button
            className="bg-black hover:bg-red-500 focus:bg-cyan-500 py-3 px-6 text-white transition-colors duration-200 border border-gray-100 rounded-full"
            onClick={handleFormSubmit}
          >
            Add Program
          </button>
    </main>
  );
}