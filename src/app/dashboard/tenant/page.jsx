"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function TenantDashboard() {
  const router = useRouter();

  const [lease, setLease] = useState(null);
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      router.push("/login");
      return;
    }

    const leases =
      JSON.parse(localStorage.getItem("leases")) || [];

    const currentLease = leases.find(
      (lease) => lease.tenantEmail === user.email
    );

    if (currentLease) {
      setLease(currentLease);

      const units =
        JSON.parse(localStorage.getItem("units")) || [];

      const currentUnit = units.find(
        (unit) =>
          unit.unitNumber === currentLease.unit
      );

      setUnit(currentUnit);
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

        <div className="mt-6 text-left">

          {lease ? (
            <>
              <p className="text-black">
                <strong>Unit:</strong> {lease.unit}
              </p>

              <p className="text-black">
                <strong>Lease Expiry:</strong> {lease.leaseEnd}
              </p>

              <p className="text-black">
                <strong>Monthly Rent:</strong> Rs. {unit?.rent}
              </p>

              <p className="text-black">
                <strong>Landlord Contact:</strong> landlord@rentease.com
              </p>
            </>
          ) : (
            <p className="text-gray-600">
              No Active Lease Found.
            </p>
          )}

        </div>

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