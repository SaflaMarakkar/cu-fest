// app/programs/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";

const programDetails = {
  "opening-ceremony": {
    title: "Opening Ceremony",
    description: "This is the grand opening ceremony with keynote speakers and cultural events.",
    registrationLink: "/register?event=opening-ceremony",
  },
  "Technova-7.0": {
    title: "Technova 7.0",
    description: "Learn about Artificial Intelligence with hands-on sessions and real-world projects.",
    registrationLink: "/register?event=Technova-7.0",
  },
  "Talen'x-2.0": {
    title: "Talen'x 2.0",
    description: "Kick off the 24-hour coding competition and meet your teams.",
    registrationLink: "/register?event=Talen'x-2.0",
  },
  "confluence": {
    title: "Confluence",
    description: "Showcase of robotics innovations by students and startups.",
    registrationLink: "/register?event=confluence",
  },
  "scriptorium": {
    title: "Scriptorium",
    description: "Top coding teams compete in the grand finale.",
    registrationLink: "/register?event=scriptorium",
  },
  "conjura": {
    title: "Conjura",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=conjura",
  },
  "spot-events": {
    title: "Spot Events",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=spot-events",
  },
  "LAN-Havoc": {
    title: "LAN Havoc",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=LAN-Havoc",
  },
  "shutter-vision": {
    title: "Shutter Vision",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=shutter-vision",
  },
  "shoot-sync": {
    title: "Shoot Sync",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=shoot-sync",
  },
  "Scavange-Squad": {
    title: "Scavange Squad",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=Scavange-Squad",
  },
  "Brain-Brawl": {
    title: "Brain Brawl",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=Brain-Brawl",
  },
  "Flag-Frenzy": {
    title: "Flag Frenzy",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=Flag-Frenzy",
  },
  "codigo": {
    title: "Codigo",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=codigo",
  },
  "evoca": {
    title: "Evoca",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=evoca",
  },
  "Dialectic-Dual": {
    title: "Dialectic Dual",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=Dialectic-Dual",
  },
  "Spot-Dance": {
    title: "Spot Dance",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=Spot-Dance",
  },
  "Cultural-Night": {
    title: "Cultural Night",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=Cultural-Night",
  },
  "closing-ceremony": {
    title: "Closing Ceremony",
    description: "Closing remarks, award distribution, and celebration party!",
    registrationLink: "/register?event=closing-ceremony",
  },
};

export default function ProgramDetail({ params }: { params: { slug: string } }) {
  const program = programDetails[params.slug];

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
        <a href="/programs" className="text-indigo-500 hover:underline">&larr; Back to Programs</a>
      </div>
    </main>
  );
}
