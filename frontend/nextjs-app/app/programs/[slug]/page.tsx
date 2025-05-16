"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import generatePDF from "react-to-pdf";
import ModalDialog from "@/app/components/ModalDialog";

export default function ProgramDetail() {
  const router = useRouter();
  const params = useParams();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [userRoles, setUserRoles] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [program, setProgram] = useState({
    name: "",
    description: "",
    _id: "",
  });

  const [registeredUsers, setRegisteredUsers] = useState([]);

  const fetchData = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/programs/" + params.slug
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch programs");
    }
    setProgram(data);
  };

  const fetchRegisteredUsersByProgramId = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/users/registered/" + params.slug
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch programs");
    }
    setRegisteredUsers(data);
  };

  const register = async (id: string) => {
    if (!localStorage?.getItem("user-id")) {
      router.push("/");
    } else {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/users/register",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: localStorage?.getItem("user-id"),
            registeredPrograms: [id],
          }),
        }
      );
    }
    setOpen(true);
  };

  useEffect(() => {
    fetchData();
    fetchRegisteredUsersByProgramId();
    if (localStorage?.getItem("roles")) {
      setUserRoles(localStorage?.getItem("roles"));
    }
  }, []);

  const onHandleDownload = async () => {
    generatePDF(sectionRef, { filename: "page.pdf" });
  };

  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto">
      {/* Optional: Go Back Button */}
      <div className="my-8">
        <Link href="/programs" className="text-indigo-500 hover:underline">
          &larr; Back to Programs
        </Link>
      </div>
      <div className="bg-black rounded-2xl p-6 border border-gray-100">
        <h1 className="text-4xl font-bold text-white mb-6">{program.name}</h1>
        <p className="text-gray-200 text-lg">{program.description}</p>
        {userRoles?.toLocaleLowerCase() === "user" ? (
        <div className="mt-8 flex justify-end">
          {/* Register Now Button */}
          <button
            onClick={() => register(program._id)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Register Now
          </button>
        </div>) : null}
      </div>

      {userRoles?.toLocaleLowerCase() !== "user" ? (
        <>
          <section
            className="mt-12 flex flex-col items-center"
            ref={sectionRef}
          >
            <h2 className="text-3xl font-bold text-gray-500 mb-6">
              Registered Users
            </h2>
            <div className="grid gap-6 grid-cols-1 w-full">
              <table
                className="table-auto w-screen-full text-gray-500 "
                style={{ borderCollapse: "collapse", marginTop: "1rem" }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      #
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      ID
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      First Name
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      Last Name
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {registeredUsers?.map?.((user: any, index) => (
                    <tr key={user._id}>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {user._id}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {user.firstName}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {user.lastName}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {user.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <button
            className="mt-4 border border-gray-200 text-white px-4 py-4 rounded-xl font-semibold transition print:!hidden"
            onClick={onHandleDownload}
          >
            Download
          </button>
        </>
      ) : null}
      <ModalDialog open={open} setOpen={setOpen} />
    </main>
  );
}
