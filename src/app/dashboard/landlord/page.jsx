"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function LandlordDashboard() {
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
      <div className="rounded-lg bg-white p-8 shadow-lg text-center w-[450px]">
        <h1 className="text-3xl font-bold text-black">
          Landlord Dashboard
        </h1>

        <p className="mt-3 text-gray-600">
          Welcome to RentEase!
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/properties"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Manage Properties
          </Link>

          <Link
            href="/units"
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Manage Units
          </Link>

          <Link
            href="/revenue"
            className="mt-4 block rounded bg-purple-600 px-4 py-2 text-center text-white"
          >
            Revenue Summary
          </Link>

          <Link
            href="/tickets"
            className="mt-4 block rounded bg-orange-600 px-4 py-2 text-center text-white"
          >
            Manage Maintenance Tickets
          </Link>

          <Link
            href="/tenants"
            className="rounded bg-purple-600 px-4 py-2 text-white"
          >
            Manage Tenants
          </Link>

          <button
            onClick={handleLogout}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}