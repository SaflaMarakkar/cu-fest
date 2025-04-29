"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const roles = ["Admin", "User", "Volunteer"]; // Available roles to switch

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
        console.log(data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
}
  }, [loading]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    console.log(userId, newRole);
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
    console.log(await res.json());
    
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

