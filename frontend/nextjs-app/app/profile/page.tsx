"use client";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  Physics,
} from "@react-three/rapier";
import Band from "../components/Band";
import ProfileCard from "../components/ProfileCard";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

interface UserData {
  firstName: string;
  lastName: string;
  roles: string[];
  registeredPrograms: string[];
  associatedPrograms: string[];
}
export default function App() {
  const [result, setResult] = useState<UserData | null>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const handleData = useCallback(async () => {
    const id = localStorage?.getItem("user-id") || "";
    if (!id) return;
    const data = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${id}`).then((res) => res.json()).catch((err) => console.log("&&&&&",err));
    if (!data) return;
    setResult(data);
  }, []);

  const getAllPrograms = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/programs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch programs");
      }
      const data = await res.json();
      setPrograms(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(result, programs);
  

  useEffect(() => {
    handleData();
    getAllPrograms();
  }, [handleData]);
  
  return (
    <div className="relative min-h-screen w-full">
      <div className="flex flex-row h-screen w-full">
        <div className="w-3/4 bg-black">
        <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
          <ambientLight intensity={Math.PI} />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band name={((result?.firstName || "") + " " + (result?.lastName || "")) || "Guest"} role={result?.roles?.[0] || "Guest"}/>
          </Physics>
          <Environment background blur={0.75}>
            <color attach="background" args={["grey"]} />
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
        </div>
        <div className="m-auto w-full lg:w-1/2">
          <ProfileCard userData={result}/>
          {/* <RegistrationForm name={name} setName={setName} role={role} setRole={setRole}/> */}
        </div>
        
      </div>
      <div className="w-full p-6">
          <h1 className="text-2xl font-semibold text-white">Registered Programs</h1>
          <div className="rounded-2xl shadow-lg p-4 my-4 hover:shadow-2xl transition flex flex-row gap-2">
          {programs?.map?.((program: any) => (
            <> {(result?.registeredPrograms?.includes(program._id)) && (
              <div key={program?._id} className="border border-gray-200 rounded-2xl shadow-lg p-4 my-4 hover:shadow-2xl transition flex flex-col justify-between w-1/3">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{program.name}</h3>
                  <p className="mt-4 text-gray-200">{program.description}</p>
                </div>
                <div className="mt-6">
                  <Link href={`/programs/${program._id}`}>
                    <span className="text-indigo-500 hover:underline font-semibold">View More →</span>
                  </Link>
                </div>
              </div>)
            }
            </>
          ))}
          </div>
        </div>
        <div className="w-full p-6">
          <h1 className="text-2xl font-semibold text-white">Associated Programs</h1>
          <div className="rounded-2xl shadow-lg p-4 my-4 hover:shadow-2xl transition flex flex-row gap-2">
          {programs?.map?.((program: any) => (
            <> {(result?.associatedPrograms?.includes(program._id)) && (
              <div key={program?._id} className="border border-gray-200 rounded-2xl shadow-lg p-4 my-4 hover:shadow-2xl transition flex flex-col justify-between w-1/3">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{program.name}</h3>
                  <p className="mt-4 text-gray-200">{program.description}</p>
                </div>
                <div className="mt-6">
                  <Link href={`/programs/${program._id}`}>
                    <span className="text-indigo-500 hover:underline font-semibold">View More →</span>
                  </Link>
                </div>
              </div>)
            }
            
            </>
          ))}
          </div>
        </div>
    </div>
  );
}
