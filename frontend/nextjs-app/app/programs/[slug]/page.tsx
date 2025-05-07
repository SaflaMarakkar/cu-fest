"use client";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function ProgramDetail({ params }: { params: { slug: string } }) {
  const [program, setProgram] = useState({
    name: "",
    description: "",
  });
  
  const fetchData = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/programs/" + params.slug);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch programs");
    }
    setProgram(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-6">{program.name}</h1>
      <p className="text-gray-200 text-lg">{program.description}</p>

      {/* Register Now Button */}
      {/* <Link href={program.registrationLink}>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
          Register Now
        </button>
      </Link> */}

      {/* Optional: Go Back Button */}
      <div className="mt-8">
        <Link href="/programs" className="text-indigo-500 hover:underline">&larr; Back to Programs</Link>
      </div>
    </main>
  );
}
