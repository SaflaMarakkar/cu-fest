import Link from "next/link";
import React from "react";

  export default async function ProgramsPage() {
    const programs = await fetch(process.env.NEXT_PUBLIC_API_URL + "/programs").then(res => res.json());
    return (
      <main className="min-h-screen p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Tech Fest 2025 - Program Schedule</h1>
        </header>
  
        {/* Day 1 Section */}
        <section className="max-w-6xl mx-auto mb-12">
          {/* <h2 className="text-3xl font-bold text-indigo-700 mb-6">Day 1 - April 28, 2025</h2> */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {programs?.map?.((program: any) => (
              <div
                key={program?._id}
                className="border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-white">{program.name}</h3>
                  <p className="mt-4 text-gray-200">{program.description}</p>
                </div>
                <div className="mt-6">
                  <Link href={`/programs/${program._id}`}>
                    <span className="text-indigo-500 hover:underline font-semibold">View More →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }