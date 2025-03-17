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
// import RegistrationForm from "../components/RegistrationForm";
import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Guest");
  return (
    <div className="relative h-screen w-full">
      <div className="flex flex-row h-screen w-full">
        <div className="w-3/4 bg-black">
        <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
          <ambientLight intensity={Math.PI} />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band name={name} role={role}/>
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
          {/* <ProfileCard /> */}
          {/* <RegistrationForm name={name} setName={setName} role={role} setRole={setRole}/> */}
        </div>
      </div>
    </div>
  );
}
