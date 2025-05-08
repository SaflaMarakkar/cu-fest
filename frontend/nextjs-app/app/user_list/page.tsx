"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const roles = ["Admin", "User", "Volunteer"]; // Available roles to switch

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

  useEffect(() => {
    if(!localStorage?.getItem("user-id")){
        router.push("/");
      }else{
    const fetchUsers = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
    getAllPrograms();
}
  }, [router, loading]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setLoading(true);
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: userId,
            roles: [newRole],
        })
    });
    setLoading(false);
  };

  const handleProgramAssociation = async (userId: string, programId: string) => {
    setLoading(true);
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/associate", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: userId,
            associatedPrograms: [programId],
        })
    });

    setLoading(false);
  };

  const handleProgramDisassociate = async (userId: string, programId: string) => {
    setLoading(true);
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/disassociate", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: userId,
            associatedPrograms: [programId],
        })
    });
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Users List</h1>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Email Address</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Phone Number</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Role</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Actions</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Associated Programs</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Registered Programs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.firstName}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.email}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.phoneNumber}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.roles}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", color: "black" }}>
              <select
              value={user?.roles?.join("")}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  style={{ padding: "4px" }}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {programs.map((program) => (
                  <div key={`program-${program._id}`} >
                <input
                  id={program._id}
                  type="checkbox"
                  checked={user.associatedPrograms?.includes(program._id)}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    const target = e.target as HTMLInputElement;
                    if (target.checked) {
                      handleProgramAssociation(user._id, program._id);
                    } else {
                      handleProgramDisassociate(user._id, program._id);
                    }
                  }}
                  style={{ padding: "4px" }}
                />
                <label htmlFor={program._id}>{program.name}</label>
                </div>
                ))}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {programs.filter((program) => user.registeredPrograms?.includes(program._id)).map((program) => program.name).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

