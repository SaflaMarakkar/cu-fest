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

interface UserData {
  firstName: string;
  lastName: string;
  roles: string[];
}
export default function App() {
  const [result, setResult] = useState<UserData | null>(null);
  const handleData = useCallback(async () => {
    const id = localStorage?.getItem("user-id") || "";
    if (!id) return;
    const data = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${id}`).then((res) => res.json()).catch((err) => console.log("&&&&&",err));
    if (!data) return;
    setResult(data);
  }, []);

  useEffect(() => {
    handleData();
  }, [handleData]);
  
  return (
    <div className="relative h-screen w-full">
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
    </div>
  );
}
