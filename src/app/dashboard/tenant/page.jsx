"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TenantDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-lg text-center">
        <h1 className="text-3xl font-bold text-black">
          Tenant Dashboard
        </h1>

        <p className="mt-3 text-gray-600">
          Welcome to RentEase!
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 rounded bg-red-600 px-5 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}