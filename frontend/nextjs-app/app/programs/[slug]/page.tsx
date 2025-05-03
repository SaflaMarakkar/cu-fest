// app/programs/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";


export default function ProgramDetail() {
  const program = {
    title: "Program Title",
    description: "Program Description",
    registrationLink: "#",
  };

  if (!program) {
    notFound(); // 404 if slug not found
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">{program.title}</h1>
      <p className="text-gray-700 text-lg">{program.description}</p>

      {/* Register Now Button */}
      <Link href={program.registrationLink}>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
          Register Now
        </button>
      </Link>

      {/* Optional: Go Back Button */}
      <div className="mt-8">
        <Link href="/programs" className="text-indigo-500 hover:underline">&larr; Back to Programs</Link>
      </div>
    </main>
  );
}
