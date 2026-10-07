"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      router.push("/login");
      return;
    }

    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/user?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete user.");
        return;
      }

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user._id !== id)
      );

      alert("User deleted successfully.");
    } catch (error) {
      console.log("Error deleting user:", error);
      alert("Something went wrong while deleting the user.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (user) => user.role === "admin"
  ).length;

  const totalLandlords = users.filter(
    (user) => user.role === "landlord"
  ).length;

  const totalTenants = users.filter(
    (user) => user.role === "tenant"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg bg-white p-8 shadow-lg">

          {/* Header */}
          <h1 className="text-3xl font-bold text-black">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-gray-600">
            Welcome to RentEase!
          </p>

          {/* Platform Metrics */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">

            <div className="rounded-lg bg-blue-100 p-5">
              <h2 className="font-semibold text-blue-800">
                Total Users
              </h2>

              <p className="mt-2 text-3xl font-bold text-blue-900">
                {totalUsers}
              </p>
            </div>

            <div className="rounded-lg bg-purple-100 p-5">
              <h2 className="font-semibold text-purple-800">
                Admins
              </h2>

              <p className="mt-2 text-3xl font-bold text-purple-900">
                {totalAdmins}
              </p>
            </div>

            <div className="rounded-lg bg-green-100 p-5">
              <h2 className="font-semibold text-green-800">
                Landlords
              </h2>

              <p className="mt-2 text-3xl font-bold text-green-900">
                {totalLandlords}
              </p>
            </div>

            <div className="rounded-lg bg-orange-100 p-5">
              <h2 className="font-semibold text-orange-800">
                Tenants
              </h2>

              <p className="mt-2 text-3xl font-bold text-orange-900">
                {totalTenants}
              </p>
            </div>
          </div>

          {/* Registered Users */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-black">
              Registered Users
            </h2>

            {users.length > 0 ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse border-2 border-black">
                  <thead>
                    <tr className="bg-gray-100">

                      <th className="border border-black px-4 py-2 text-left text-black">
                        Full Name
                      </th>

                      <th className="border border-black px-4 py-2 text-left text-black">
                        Email
                      </th>

                      <th className="border border-black px-4 py-2 text-left text-black">
                        Role
                      </th>

                      <th className="border border-black px-4 py-2 text-left text-black">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>

                        <td className="border border-black px-4 py-2 text-black">
                          {user.fullName}
                        </td>

                        <td className="border border-black px-4 py-2 text-black">
                          {user.email}
                        </td>

                        <td className="border border-black px-4 py-2 text-black">
                          {user.role}
                        </td>

                        <td className="border border-black px-4 py-2">
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 text-gray-600">
                No registered users found.
              </p>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-8 rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}