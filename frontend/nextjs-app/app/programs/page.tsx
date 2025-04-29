// app/programs/page.tsx   (or pages/programs.tsx)

import React from "react";
import Link from "next/link";

const day1Programs = [
  {
    title: "Opening Ceremony",
    time: "9:00 AM - 11:30 AM",
    description: "Kickstart the fest with a grand opening and keynote by industry leaders.",
    slug: "opening-ceremony",
  },
  {
    title: "Technova 7.0",
    time: "11:30 AM ",
    description: "Hands-on session on building AI models with experts from the industry.",
    slug: "Technova-7.0",
  },
  {
    title: "Talen'x 2.0",
    time: "11:30 AM",
    description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
    slug: "Talen'x-2.0",
},
  {
    title: "Confluence",
    time: "01:30 PM",
    description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
    slug: "confluence",
},
  {
    title: "Scriptorium",
    time: "01:30 PM",
    description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
    slug: "scriptorium",
}, 
  {
    title: "Conjura",
    time: "11:30",
    description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
    slug: "conjura",
},
  {
    title: "Spot Events",
    time: "Full Day",
    description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
    slug: "spot-events",
},
  {
    title: "LAN Havoc",
    time: "Full Day",
    description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
    slug: "LAN-Havoc",
}, 
  {
    title: "Shutter Vision",
    time: "Full Day",
    description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
    slug: "shutter-vision",
}, 
  {
    title: "Shoot Sync",
    time: "Full Day",
    description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
    slug: "shoot-sync",
}, 
];

const day2Programs = [
    {
      title: "Scavange Squad",
      time: "9:00 AM - 11:30 AM",
      description: "Kickstart the fest with a grand opening and keynote by industry leaders.",
      slug: "Scavange-Squad",
    },
    {
      title: "Brain Brawl",
      time: "11:30 AM ",
      description: "Hands-on session on building AI models with experts from the industry.",
      slug: "Brain-Brawl",
    },
    {
      title: "Flag Frenzy",
      time: "11:30 AM",
      description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
      slug: "Flag-Frenzy",
    },
    {
      title: "Codigo",
      time: "01:30 PM",
      description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
      slug: "codigo",
    },
    {
      title: "Evoca",
      time: "01:30 PM",
      description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
      slug: "evoca",
    }, 
    {
      title: "Dialectic Dual",
      time: "11:30",
      description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
      slug: "Dialectic-Dual",
    },
    {
      title: "Spot Dance",
      time: "Full Day",
      description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
      slug: "Spot-Dance",
    },
    {
      title: "Spot Events",
      time: "Full Day",
      description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
      slug: "spot-events",
    }, 
    {
      title: "LAN Havoc",
      time: "Full Day",
      description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
      slug: "LAN-Havoc",
    }, 
    {
      title: "Cultural Night",
      time: "08:00 PM",
      description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
      slug: "Cultural-Night",
    }, 
    {
        title: "Closing Ceremony",
        time: "08:00 PM",
        description: "Team up and start coding! 24-hour hackathon with exciting prizes.",
        slug: "closing-ceremony",
      }, 
  ];


  export default function ProgramsPage() {
    return (
      <main className="bg-gray-100 min-h-screen p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Tech Fest 2025 - Program Schedule</h1>
        </header>
  
        {/* Day 1 Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Day 1 - April 28, 2025</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {day1Programs.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-indigo-600">{program.title}</h3>
                  <p className="text-gray-500 mt-2">{program.time}</p>
                  <p className="mt-4 text-gray-700">{program.description}</p>
                </div>
                <div className="mt-6">
                  <Link href={`/programs/${program.slug}`}>
                    <span className="text-indigo-500 hover:underline font-semibold">View More →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Day 2 Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Day 2 - April 29, 2025</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {day2Programs.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-indigo-600">{program.title}</h3>
                  <p className="text-gray-500 mt-2">{program.time}</p>
                  <p className="mt-4 text-gray-700">{program.description}</p>
                </div>
                <div className="mt-6">
                  <Link href={`/programs/${program.slug}`}>
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