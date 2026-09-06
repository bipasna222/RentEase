"use client";

import { useEffect, useState } from "react";

export default function RevenuePage() {
  const [expectedIncome, setExpectedIncome] = useState(0);
  const [collectedIncome, setCollectedIncome] = useState(0);

  useEffect(() => {
    loadRevenue();
  }, []);

  const loadRevenue = async () => {
    try {
      const [leasesResponse, unitsResponse, paymentsResponse] =
        await Promise.all([
          fetch("/api/lease"),
          fetch("/api/unit"),
          fetch("/api/payment"),
        ]);

      const leases = await leasesResponse.json();
      const units = await unitsResponse.json();
      const payments = await paymentsResponse.json();

      let expected = 0;
      let collected = 0;

      const today = new Date();

      // Calculate expected income from active leases
      leases.forEach((lease) => {
        const start = new Date(lease.leaseStart);
        const end = new Date(lease.leaseEnd);

        if (today >= start && today <= end) {
          const unit = units.find(
            (unit) => String(unit.unitNumber) === String(lease.unit)
          );

          if (unit) {
            expected += Number(unit.rent || 0);
          }
        }
      });

      // Calculate collected income from paid payments
      payments.forEach((payment) => {
        if (payment.status === "Paid") {
          collected += Number(payment.amount || 0);
        }
      });

      setExpectedIncome(expected);
      setCollectedIncome(collected);
    } catch (error) {
      console.log("Revenue loading error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-black">
        Revenue Summary
      </h1>

      <div className="rounded-lg bg-white p-6 shadow">

        <div className="mb-6 rounded border bg-gray-50 p-4">
          <h2 className="text-xl font-bold text-black">
            Expected Monthly Income
          </h2>

          <p className="mt-2 text-2xl font-semibold text-green-600">
            Rs. {expectedIncome}
          </p>
        </div>

        <div className="rounded border bg-gray-50 p-4">
          <h2 className="text-xl font-bold text-black">
            Amount Collected
          </h2>

          <p className="mt-2 text-2xl font-semibold text-blue-600">
            Rs. {collectedIncome}
          </p>
        </div>

      </div>
    </div>
  );
}